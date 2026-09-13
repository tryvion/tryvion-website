/**
 * TRYVION RFP Private Blob Authentication
 *
 * Authentication strategy:
 *
 * LOCAL DEVELOPMENT
 * ------------------
 * Uses the BLOB_READ_WRITE_TOKEN supplied by the connected
 * tryvion-cms-media Blob store.
 *
 * VERCEL PREVIEW / PRODUCTION
 * ---------------------------
 * Uses Vercel OIDC with BLOB_STORE_ID.
 *
 * This keeps local development testable while retaining
 * short-lived OIDC authentication in deployed environments.
 */

type RFPBlobAuthOptions =
  | {
      token: string
      storeId?: string
    }
  | {
      storeId: string
    }

const PRIVATE_BLOB_STORE_ID = process.env.BLOB_STORE_ID?.trim()

const READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN?.trim()

const OIDC_TOKEN = process.env.VERCEL_OIDC_TOKEN?.trim()

const VERCEL_ENV = process.env.VERCEL_ENV?.trim()

const IS_VERCEL_DEPLOYMENT = process.env.VERCEL === '1' || process.env.VERCEL === 'true'

const IS_DEPLOYED_VERCEL_ENV =
  IS_VERCEL_DEPLOYMENT && (VERCEL_ENV === 'production' || VERCEL_ENV === 'preview')

/**
 * Returns the correct Blob authentication configuration
 * for the current runtime.
 */
export function getRFPBlobAuthOptions(): RFPBlobAuthOptions {
  /*
   * ============================================================
   * VERCEL PREVIEW / PRODUCTION
   * ============================================================
   *
   * Vercel provides OIDC authentication for connected Blob
   * stores in deployed environments.
   *
   * We intentionally do NOT pass BLOB_READ_WRITE_TOKEN here.
   */
  if (IS_DEPLOYED_VERCEL_ENV) {
    if (!PRIVATE_BLOB_STORE_ID) {
      throw new Error('BLOB_STORE_ID is not configured for the RFP private Blob store.')
    }

    if (!OIDC_TOKEN) {
      throw new Error('VERCEL_OIDC_TOKEN is not available for the deployed RFP Blob environment.')
    }

    return {
      storeId: PRIVATE_BLOB_STORE_ID,
    }
  }

  /*
   * ============================================================
   * LOCAL DEVELOPMENT
   * ============================================================
   *
   * Vercel does not enable Blob OIDC for the Development
   * environment of this store.
   *
   * The Vercel CLI has already supplied BLOB_READ_WRITE_TOKEN
   * through the connected private Blob store.
   *
   * We use that credential only for local development.
   */
  if (READ_WRITE_TOKEN) {
    return {
      token: READ_WRITE_TOKEN,
      ...(PRIVATE_BLOB_STORE_ID ? { storeId: PRIVATE_BLOB_STORE_ID } : {}),
    }
  }

  /*
   * ============================================================
   * SAFETY FAILURE
   * ============================================================
   */
  throw new Error(
    'No usable authentication is available for the TRYVION RFP private Blob store. ' +
      'Local development requires BLOB_READ_WRITE_TOKEN; ' +
      'Vercel Preview/Production requires Vercel OIDC.',
  )
}
