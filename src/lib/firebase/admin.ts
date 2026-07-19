/**
 * Firebase Admin SDK — server-only.
 * Import only from Route Handlers, Server Actions, and Server Components.
 * NEVER import this file from a Client Component or any file with "use client".
 *
 * The service account is loaded from FIREBASE_SERVICE_ACCOUNT_JSON (a JSON
 * string) or falls back to Application Default Credentials (useful on Cloud
 * Run where Workload Identity is configured).
 */
import "server-only";

import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getStorage, type Storage } from "firebase-admin/storage";

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0]!;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson) as object;
    return initializeApp({
      credential: cert(serviceAccount as Parameters<typeof cert>[0]),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }

  // Fallback: Application Default Credentials (Cloud Run with Workload Identity)
  return initializeApp({
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

export function getAdminStorage(): Storage {
  return getStorage(getAdminApp());
}
