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

# Generate this once, store it safely, and keep the same value across deployments.
export EMAIL_SETTINGS_ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")

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
| `NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY` | Firebase App Check reCAPTCHA v3 provider |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | GA4 web data stream measurement ID (for example `G-XXXXXXXXXX`) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full contents of the Firebase Admin JSON (Step 3) |

`EMAIL_SETTINGS_ENCRYPTION_KEY` is stored directly in Google Secret Manager by
the setup script. It does not need to be added as a GitHub secret because it is
only read by Cloud Run at runtime.

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

The production site uses Cloud Run domain mappings with DNS hosted at one.com.
Map both the apex domain and `www` to the production `debageri-web` service,
never to a branch preview service.

> Cloud Run direct domain mapping is currently a Preview feature. It is the
> simplest option for this site, but Google recommends an external Application
> Load Balancer for production workloads that require a generally available
> domain-routing product.

### 1. Verify ownership of `debageri.se`

1. Open Google Cloud Console → **Cloud Run** → **Domain mappings**.
2. Click **Add mapping**, select the production service, and choose
   **Verify a new domain**.
3. Enter `debageri.se`. Google provides a TXT verification record.
4. In one.com, open **DNS settings** → **DNS records** and add that TXT record.
   For the root domain, leave the **Hostname** field empty.
5. Return to Google Cloud and finish verification.

The TXT record proves ownership only. It does not send web traffic to Cloud Run.

### 2. Map the apex domain

1. Create a domain mapping from `debageri.se` to the production service.
2. Open the mapping's three-dot menu → **DNS Records**.
3. In one.com, add every `A` and `AAAA` record displayed by Cloud Run. Leave
   **Hostname** empty for each root-domain record.
4. Remove only conflicting root website records, such as one.com's default
   `A` record to `46.30.211.38`. Do not remove mail or unrelated subdomain records.

At the time of setup, Cloud Run supplied these Google endpoints. Always prefer
the exact values currently displayed in the Cloud Run mapping:

```text
A     216.239.32.21
A     216.239.34.21
A     216.239.36.21
A     216.239.38.21
AAAA  2001:4860:4802:32::15
AAAA  2001:4860:4802:34::15
AAAA  2001:4860:4802:36::15
AAAA  2001:4860:4802:38::15
```

Keep all one.com `MX`, SPF, DKIM, and other email records so
`info@debageri.se` continues to work. Records for other hosts, such as
`resumematcher.debageri.se`, do not conflict with the apex mapping.

### 3. Map `www`

1. Add another Cloud Run mapping. Select the verified `debageri.se` domain and
   enter only `www` in the subdomain field. The result must be
   `www.debageri.se`.
2. If the console rejects a valid subdomain, create it in Cloud Shell:

   ```bash
   gcloud config set project debageri-web
   gcloud beta run domain-mappings create \
     --service debageri-web \
     --domain www.debageri.se \
     --region europe-west1
   ```

3. In one.com, create the CNAME shown by Cloud Run:

   ```text
   Type: CNAME
   Hostname: www
   Is an alias of: ghs.googlehosted.com
   TTL: default
   ```

If Cloud Run displays `ghs.googlehosted.com.`, remove the final dot if one.com
rejects it. Do not include `https://`, a path, spaces, or quotation marks.

### 4. Allow both public hostnames

Add both hostnames to the reCAPTCHA v3 allowed-domain list and to Firebase
Authentication → **Settings** → **Authorized domains**:

```text
debageri.se
www.debageri.se
```

Use hostnames only: no protocol, path, or trailing slash. The existing App Check
provider and matching reCAPTCHA site/secret key pair remain unchanged.

Branch preview hostnames must also be allowed by reCAPTCHA before App Check can
exchange a token. A rejected exchange returns 403 before the application request
reaches the backend. The browser SDK may then throttle retries for up to a day;
after correcting the domain, use a fresh private window or clear that preview
site's storage to reset the local backoff.

### 5. Verify DNS and HTTPS

On Windows, check the public records with:

```powershell
Resolve-DnsName debageri.se -Type A
Resolve-DnsName debageri.se -Type AAAA
Resolve-DnsName www.debageri.se -Type CNAME
```

The apex records must resolve to the Google values shown by Cloud Run, not
one.com's old web-hosting address. one.com remaining as the `NS` provider is
expected because it still manages DNS.

Cloud Run issues and renews a Google-managed TLS certificate automatically after
DNS is correct. Provisioning commonly takes about 15 minutes but can take up to
24 hours. Do not bypass a browser certificate warning or submit credentials until
the mapping reports the certificate as active. Avoid deleting and recreating a
pending mapping because doing so can restart provisioning.

Finally test:

```text
https://debageri.se
https://www.debageri.se
https://debageri.se/admin/login
https://debageri.se/careers
```

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

Deploy the contact-message index at the same time as the Firestore rules:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

The application feature also requires Firebase Storage and the private resume rules:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

Submit a test application and confirm it appears at `/admin/candidates`. Signed
resume downloads require the Cloud Run service account (or configured Firebase
Admin credential) to have permission to sign Cloud Storage URLs.

## Configure contact messages and the first admin

Before enabling the contact form in production:

1. In Firebase App Check, register the web app with a reCAPTCHA v3 provider and
   add its site key as the `NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY`
   GitHub Actions secret. It is public configuration baked into the browser bundle.
2. In Firestore, enable a TTL policy for the `contactMessages` collection group
   using the `expiresAt` field.
3. In Firebase Authentication, enable Email/Password and create the first admin user.
4. Copy that user's UID and create `admins/{uid}` in Firestore with `email`,
   `displayName`, and a `createdAt` timestamp. There is intentionally no public
   admin-registration endpoint.

You can also add this as a GitHub Actions step if you want rules to deploy automatically on merge.

---

## Environment variables reference

| Variable | Where used | How set |
|----------|-----------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Browser bundle (baked in at build time) | GitHub secret → Docker build arg → ENV |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Browser bundle, loaded only after visitor consent | GitHub secret → Docker build arg → ENV |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server (API routes, Server Components) | Secret Manager → Cloud Run runtime |
| `EMAIL_SETTINGS_ENCRYPTION_KEY` | Server-side SMTP password encryption | Secret Manager → Cloud Run runtime |
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
