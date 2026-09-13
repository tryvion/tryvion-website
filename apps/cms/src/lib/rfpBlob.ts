/**
 * TRYVION RFP Private Blob Authentication
 *
 * Authentication strategy:
 *
 * VERCEL PREVIEW / PRODUCTION
 * ---------------------------
 * Uses the BLOB_READ_WRITE_TOKEN supplied by the connected
 * tryvion-cms-media Blob store.
 *
 * If the deployment provides VERCEL_OIDC_TOKEN instead,
 * OIDC remains available as a fallback.
 *
 * LOCAL DEVELOPMENT
 * ------------------
 * Uses the BLOB_READ_WRITE_TOKEN supplied by the connected
 * tryvion-cms-media Blob store.
 *
 * BLOB_STORE_ID is included whenever available so the
 * private Blob store remains explicitly targeted.
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

/**
 * Returns the correct Blob authentication configuration
 * for the current runtime.
 */
export function getRFPBlobAuthOptions(): RFPBlobAuthOptions {
  /*
   * ============================================================
   * PRIMARY AUTHENTICATION
   * ============================================================
   *
   * The connected TRYVION private Blob store supplies
   * BLOB_READ_WRITE_TOKEN to the CMS project.
   *
   * This credential is available in both local development
   * and the Vercel Production/Preview environments shown
   * in the Vercel Storage connection.
   *
   * Prefer it whenever it is available.
   */
  if (READ_WRITE_TOKEN) {
    return {
      token: READ_WRITE_TOKEN,
      ...(PRIVATE_BLOB_STORE_ID ? { storeId: PRIVATE_BLOB_STORE_ID } : {}),
    }
  }

  /*
   * ============================================================
   * VERCEL OIDC FALLBACK
   * ============================================================
   *
   * Some Vercel deployments may provide VERCEL_OIDC_TOKEN
   * instead of a read-write token.
   *
   * If that credential is available, use the private Blob
   * store ID and allow the Blob SDK to authenticate through
   * OIDC.
   */
  if (OIDC_TOKEN) {
    if (!PRIVATE_BLOB_STORE_ID) {
      throw new Error('BLOB_STORE_ID is not configured for the RFP private Blob store.')
    }

    return {
      storeId: PRIVATE_BLOB_STORE_ID,
    }
  }

  /*
   * ============================================================
   * SAFETY FAILURE
   * ============================================================
   */
  throw new Error(
    'No usable authentication is available for the TRYVION RFP private Blob store. ' +
      'BLOB_READ_WRITE_TOKEN or VERCEL_OIDC_TOKEN is required.',
  )
}
