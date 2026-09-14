/**
 * TRYVION Customer Support private Blob storage.
 *
 * Customer Support attachments intentionally use the same private
 * Blob credential already proven by the RFP implementation.
 *
 * The existing RFP helper is preferred so the working project-level
 * credential/authentication strategy remains centralized.
 */

export function getCustomerSupportBlobToken(): string {
  const token =
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.RFP_BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.VERCEL_OIDC_TOKEN?.trim();

  if (!token) {
    throw new Error(
      'No private Blob credential is configured. ' +
        'Set BLOB_READ_WRITE_TOKEN (preferred), RFP_BLOB_READ_WRITE_TOKEN, or VERCEL_OIDC_TOKEN.',
    );
  }

  return token;
}
