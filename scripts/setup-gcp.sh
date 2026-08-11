#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# One-time Google Cloud setup for Debageri Web
#
# Run this once from a machine with gcloud authenticated as an owner/editor,
# or let a Cursor agent run it when GCP_SERVICE_ACCOUNT_KEY is available.
#
# Usage:
#   export GCP_PROJECT_ID=your-project-id
#   export GCP_REGION=europe-west1
#   bash scripts/setup-gcp.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:?GCP_PROJECT_ID is required}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE="debageri-web"
REGISTRY="${REGION}-docker.pkg.dev"
REPO="debageri"

echo "▶ Project : $PROJECT_ID"
echo "▶ Region  : $REGION"
echo "▶ Registry: $REGISTRY/$PROJECT_ID/$REPO"

# ── 1. Enable required APIs ──────────────────────────────────────────────────
echo ""
echo "── Enabling APIs ───────────────────────────────────────────────────────"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  --project="$PROJECT_ID"

# ── 2. Create Artifact Registry repository ───────────────────────────────────
echo ""
echo "── Creating Artifact Registry repository ───────────────────────────────"
gcloud artifacts repositories create "$REPO" \
  --repository-format=docker \
  --location="$REGION" \
  --description="Debageri web Docker images" \
  --project="$PROJECT_ID" \
  2>/dev/null || echo "   (repository already exists — skipping)"

# ── 3. Store Firebase secrets in Secret Manager ──────────────────────────────
# The Cloud Run service reads secrets from Secret Manager at runtime.
# Run this block once — re-running is safe (it adds a new version).
echo ""
echo "── Storing secrets in Secret Manager ───────────────────────────────────"

store_secret() {
  local name="$1"
  local value="${!name:-}"
  if [ -z "$value" ]; then
    echo "   SKIP $name (env var not set)"
    return
  fi
  # Create secret if it doesn't exist
  gcloud secrets describe "$name" --project="$PROJECT_ID" &>/dev/null \
    || gcloud secrets create "$name" \
         --replication-policy=automatic \
         --project="$PROJECT_ID"
  # Add a new version
  echo -n "$value" | gcloud secrets versions add "$name" \
    --data-file=- \
    --project="$PROJECT_ID"
  echo "   OK $name"
}

store_secret FIREBASE_SERVICE_ACCOUNT_JSON
store_secret EMAIL_SETTINGS_ENCRYPTION_KEY
store_secret NEXT_PUBLIC_FIREBASE_API_KEY
store_secret NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
store_secret NEXT_PUBLIC_FIREBASE_PROJECT_ID
store_secret NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
store_secret NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
store_secret NEXT_PUBLIC_FIREBASE_APP_ID

# ── 4. Grant Cloud Run service account access to secrets ─────────────────────
echo ""
echo "── Granting Secret Manager access to Cloud Run SA ──────────────────────"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
CLOUD_RUN_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

for secret in \
  FIREBASE_SERVICE_ACCOUNT_JSON \
  EMAIL_SETTINGS_ENCRYPTION_KEY \
  NEXT_PUBLIC_FIREBASE_API_KEY \
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
  NEXT_PUBLIC_FIREBASE_PROJECT_ID \
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
  NEXT_PUBLIC_FIREBASE_APP_ID; do
  gcloud secrets add-iam-policy-binding "$secret" \
    --member="serviceAccount:$CLOUD_RUN_SA" \
    --role="roles/secretmanager.secretAccessor" \
    --project="$PROJECT_ID" \
    --quiet 2>/dev/null || true
done
echo "   Done"

# ── 5. Grant deployer SA the necessary roles ─────────────────────────────────
echo ""
echo "── Done ─────────────────────────────────────────────────────────────────"
echo ""
echo "Next steps:"
echo "  1. Add all secrets listed below to your GitHub repository:"
echo "     https://github.com/debageriab-prog/debageri-web/settings/secrets/actions"
echo ""
echo "     GCP_PROJECT_ID          = $PROJECT_ID"
echo "     GCP_REGION              = $REGION"
echo "     GCP_SERVICE_ACCOUNT_KEY = (contents of the deployer service account JSON)"
echo "     NEXT_PUBLIC_FIREBASE_*  = (Firebase web app config values)"
echo "     FIREBASE_SERVICE_ACCOUNT_JSON = (Firebase Admin service account JSON)"
echo ""
echo "  2. Push to main — the deploy workflow will build, push, and deploy."
echo "     The live URL will appear at the end of the workflow run."
