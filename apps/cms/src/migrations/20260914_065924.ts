import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sales_enquiries_enquiry_type" AS ENUM('Services & Solutions', 'Commercial Enquiries', 'Existing Opportunities', 'Partnerships', 'General Enquiries');
  CREATE TYPE "public"."enum_sales_enquiries_status" AS ENUM('new', 'in_progress', 'contacted', 'qualified', 'closed', 'spam');
  CREATE TABLE "sales_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"job_title" varchar,
  	"company" varchar NOT NULL,
  	"country_region" varchar NOT NULL,
  	"work_email" varchar NOT NULL,
  	"enquiry_type" "enum_sales_enquiries_enquiry_type" NOT NULL,
  	"phone" varchar,
  	"message" varchar NOT NULL,
  	"privacy_consent" boolean DEFAULT false NOT NULL,
  	"privacy_consent_at" timestamp(3) with time zone,
  	"marketing_consent" boolean DEFAULT false,
  	"website" varchar,
  	"status" "enum_sales_enquiries_status" DEFAULT 'new' NOT NULL,
  	"source" varchar DEFAULT 'website-sales-enquiries',
  	"submitted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sales_enquiries_id" integer;
  CREATE INDEX "sales_enquiries_updated_at_idx" ON "sales_enquiries" USING btree ("updated_at");
  CREATE INDEX "sales_enquiries_created_at_idx" ON "sales_enquiries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sales_enquiries_fk" FOREIGN KEY ("sales_enquiries_id") REFERENCES "public"."sales_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_sales_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("sales_enquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sales_enquiries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sales_enquiries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sales_enquiries_fk";
  
  DROP INDEX "payload_locked_documents_rels_sales_enquiries_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sales_enquiries_id";
  DROP TYPE "public"."enum_sales_enquiries_enquiry_type";
  DROP TYPE "public"."enum_sales_enquiries_status";`)
}
