# Deployment Guide — Google Cloud Run + Firebase

This guide covers everything needed to deploy the Debageri web app to Google Cloud Run with Firebase as the backend. It assumes you are starting from scratch.

---

## Architecture overview

```
GitHub Actions
  └── builds Docker image
  └── pushes to Artifact Registry
  └── deploys to Cloud Run
          │
          ├── reads secrets from Secret Manager at runtime
          ├── serves the Next.js app on port 8080
          └── connects to Firebase services
                  ├── Firestore (database)
                  ├── Firebase Auth (admin login)
                  └── Firebase Storage (resume uploads)
```

---

## Prerequisites

- A Google account with billing enabled
- A GitHub repository
- The `gcloud` CLI installed locally, or use Google Cloud Shell (no install needed)

---

## Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**, name it (e.g. `debageri-web`), click through
3. Inside the project, enable:
   - **Firestore Database** → Create database → Production mode → Region: `europe-west1`
   - **Authentication** → Get started → Enable Email/Password
   - **Storage** → Get started → Production mode → Region: `europe-west1`

> Storage requires the **Blaze (pay-as-you-go)** plan. You are not charged until you exceed the generous free tier. Set a budget alert at $10 in Cloud Billing to be safe.

---

## Step 2 — Get the Firebase web app config (public values)

1. Firebase console → **Project settings** (gear icon) → **General** tab
2. Scroll to **Your apps** → **Add app** → Web (`</>`)
3. Register the app, then copy the config object:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

These values are safe to expose to the browser. They are stored as GitHub secrets so the CI workflow can bake them into the Docker image at build time.

---

## Step 3 — Create the Firebase Admin service account

1. Firebase console → **Project settings** → **Service accounts** tab
2. Click **Generate new private key** → download the JSON file
3. Keep this file secure — it grants full Admin SDK access to your Firebase project

---

## Step 4 — Create the GCP deployer service account

This account is used by GitHub Actions to push Docker images and deploy to Cloud Run. It should have only the permissions it needs — not owner.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → **IAM & Admin** → **Service Accounts**
2. Click **Create service account**, name it `github-deployer`
3. Grant these roles:
   - `Cloud Run Admin`
   - `Artifact Registry Writer`
   - `Service Account User`
   - `Storage Admin`
4. Click **Done**, then click the account → **Keys** → **Add key** → **JSON**
5. Download the JSON file

---

## Step 5 — Run the one-time GCP setup script

This script enables the required APIs, creates the Artifact Registry Docker repository, stores secrets in Secret Manager, and grants the Cloud Run service account access to them.

**Run it from Google Cloud Shell** (recommended — no local install needed):

1. Open [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project in the top dropdown
3. Click the **`>`_** Cloud Shell icon in the top-right toolbar
4. Run:

```bash
git clone https://github.com/debageriab-prog/debageri-web.git
cd debageri-web
git checkout main   # or the branch you want to deploy from

export GCP_PROJECT_ID=$(gcloud config get-value project)
export GCP_REGION=europe-west1

# Firebase Admin JSON (multiline — paste as-is between EOF markers)
export FIREBASE_SERVICE_ACCOUNT_JSON=$(cat << 'EOF'
{ ...paste full JSON here... }
EOF
)

# Firebase web app config (public values)
export NEXT_PUBLIC_FIREBASE_API_KEY='your-api-key'
export NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN='your-project.firebaseapp.com'
export NEXT_PUBLIC_FIREBASE_PROJECT_ID='your-project-id'
export NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET='your-project.appspot.com'
export NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='123456789'
export NEXT_PUBLIC_FIREBASE_APP_ID='1:123456789:web:abcdef'

bash scripts/setup-gcp.sh
```

The script is safe to re-run — it skips resources that already exist.

---

## Step 6 — Add secrets to GitHub

Go to: **github.com/your-org/debageri-web/settings/secrets/actions**

Add all as **Repository secrets**:

| Secret name | Where to get the value |
|-------------|----------------------|
| `GCP_PROJECT_ID` | Cloud console project dropdown (e.g. `oceanic-camera-502217-p9`) |
| `GCP_REGION` | `europe-west1` |
| `GCP_SERVICE_ACCOUNT_KEY` | Full contents of the deployer service account JSON (Step 4) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase web app config |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full contents of the Firebase Admin JSON (Step 3) |

---

## Step 7 — Deploy

Push to `main` (or merge a PR into `main`). The GitHub Actions workflow in `.github/workflows/deploy.yml` will:

1. Authenticate to Google Cloud using `GCP_SERVICE_ACCOUNT_KEY`
2. Build the Docker image with public Firebase vars baked in
3. Push the image to Artifact Registry (`europe-west1-docker.pkg.dev/PROJECT_ID/debageri/debageri-web`)
4. Deploy the image to Cloud Run with Secret Manager bindings for server secrets
5. Print the live service URL

The URL looks like: `https://debageri-web-xxxxxxxxxx-ew.a.run.app`

You can also trigger a deploy manually from the **Actions** tab → **Deploy to Cloud Run** → **Run workflow**.

---

## Deploy a new version

No extra steps needed. Every push to `main` triggers a new build and deploy automatically. Zero-downtime: Cloud Run keeps the old revision running until the new one is healthy.

---

## Roll back to a previous version

In Cloud Run you can instantly route traffic back to any previous revision:

```bash
gcloud run services update-traffic debageri-web \
  --to-revisions=REVISION_NAME=100 \
  --region=europe-west1
```

Or do it in the Cloud Run console: **Revisions** tab → select a revision → **Manage traffic**.

---

## Add a custom domain

1. Go to [console.cloud.google.com/run](https://console.cloud.google.com/run)
2. Click your service → **Manage custom domains** → **Add mapping**
3. Enter your domain (e.g. `debageri.se`)
4. Follow the DNS verification steps — add the provided records to your DNS provider
5. Cloud Run provisions a TLS certificate automatically

---

## Deploy Firestore and Storage rules

After editing `firestore.rules` or `storage.rules`, deploy them with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase use your-project-id

# Deploy rules only (safe — does not touch data)
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

You can also add this as a GitHub Actions step if you want rules to deploy automatically on merge.

---

## Environment variables reference

| Variable | Where used | How set |
|----------|-----------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Browser bundle (baked in at build time) | GitHub secret → Docker build arg → ENV |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server (API routes, Server Components) | Secret Manager → Cloud Run runtime |
| `NODE_ENV` | Next.js runtime | Set directly in Cloud Run deploy command |

**Never** put server secrets in `NEXT_PUBLIC_*` variables — they are visible in the browser.

---

## Costs (expected for Debageri's scale)

| Service | Free tier | Expected monthly cost |
|---------|----------|----------------------|
| Cloud Run | 2M requests, 360K vCPU-seconds | $0 |
| Firestore | 50K reads/day, 20K writes/day | $0 |
| Firebase Storage | 5 GB storage, 1 GB/day download | $0 |
| Artifact Registry | 0.5 GB free | ~$0.01 |
| Secret Manager | 10K access operations free | $0 |

Set a budget alert at $10/month in Cloud Billing as a safety net.

---

## Useful commands

```bash
# View live logs
gcloud run services logs read debageri-web --region=europe-west1

# Tail logs in real time
gcloud beta run services logs tail debageri-web --region=europe-west1

# List all revisions
gcloud run revisions list --service=debageri-web --region=europe-west1

# Describe the running service (URL, env vars, etc.)
gcloud run services describe debageri-web --region=europe-west1

# Open the live URL in a browser
gcloud run services describe debageri-web --region=europe-west1 --format="value(status.url)" | xargs open
```
