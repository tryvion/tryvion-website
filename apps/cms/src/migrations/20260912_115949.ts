import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rfp_submissions_documents" DROP CONSTRAINT "rfp_submissions_documents_file_id_media_id_fk";
  
  DROP INDEX "rfp_submissions_documents_file_idx";
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "file_name" varchar NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "blob_pathname" varchar NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "blob_url" varchar NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "content_type" varchar NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "file_size" numeric NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "etag" varchar;
  ALTER TABLE "rfp_submissions_documents" ADD COLUMN "uploaded_at" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "file_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rfp_submissions_documents" ADD COLUMN "file_id" integer NOT NULL;
  ALTER TABLE "rfp_submissions_documents" ADD CONSTRAINT "rfp_submissions_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "rfp_submissions_documents_file_idx" ON "rfp_submissions_documents" USING btree ("file_id");
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "file_name";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "blob_pathname";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "blob_url";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "content_type";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "file_size";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "etag";
  ALTER TABLE "rfp_submissions_documents" DROP COLUMN "uploaded_at";`)
}
