import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_customer_support_support_area" AS ENUM('SAP Applications', 'AI & Automation', 'Integration & Technology', 'Operate', 'Other Enquiry');
  CREATE TYPE "public"."enum_customer_support_support_priority" AS ENUM('Low', 'Medium', 'High', 'Critical / Urgent');
  CREATE TYPE "public"."enum_customer_support_routing_team" AS ENUM('SAP Applications', 'AI & Automation', 'Integration & Technology', 'Operate', 'Customer Support');
  CREATE TYPE "public"."enum_customer_support_status" AS ENUM('new', 'in_progress', 'awaiting_customer', 'resolved', 'closed', 'spam');
  CREATE TABLE "customer_support_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_name" varchar NOT NULL,
  	"blob_pathname" varchar NOT NULL,
  	"content_type" varchar NOT NULL,
  	"file_size" numeric NOT NULL,
  	"uploaded_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "customer_support" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ticket_id" varchar NOT NULL,
  	"full_name" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"work_email" varchar NOT NULL,
  	"phone" varchar,
  	"support_area" "enum_customer_support_support_area" NOT NULL,
  	"support_priority" "enum_customer_support_support_priority" NOT NULL,
  	"customer_project_reference" varchar,
  	"issue" varchar NOT NULL,
  	"privacy_consent" boolean DEFAULT false NOT NULL,
  	"privacy_consent_at" timestamp(3) with time zone,
  	"marketing_consent" boolean DEFAULT false,
  	"website" varchar,
  	"routing_team" "enum_customer_support_routing_team" NOT NULL,
  	"status" "enum_customer_support_status" DEFAULT 'new' NOT NULL,
  	"source" varchar DEFAULT 'website-customer-support',
  	"submitted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "customer_support_id" integer;
  ALTER TABLE "customer_support_attachments" ADD CONSTRAINT "customer_support_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."customer_support"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "customer_support_attachments_order_idx" ON "customer_support_attachments" USING btree ("_order");
  CREATE INDEX "customer_support_attachments_parent_id_idx" ON "customer_support_attachments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "customer_support_ticket_id_idx" ON "customer_support" USING btree ("ticket_id");
  CREATE INDEX "customer_support_updated_at_idx" ON "customer_support" USING btree ("updated_at");
  CREATE INDEX "customer_support_created_at_idx" ON "customer_support" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customer_support_fk" FOREIGN KEY ("customer_support_id") REFERENCES "public"."customer_support"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_customer_support_id_idx" ON "payload_locked_documents_rels" USING btree ("customer_support_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "customer_support_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "customer_support" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "customer_support_attachments" CASCADE;
  DROP TABLE "customer_support" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_customer_support_fk";
  
  DROP INDEX "payload_locked_documents_rels_customer_support_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "customer_support_id";
  DROP TYPE "public"."enum_customer_support_support_area";
  DROP TYPE "public"."enum_customer_support_support_priority";
  DROP TYPE "public"."enum_customer_support_routing_team";
  DROP TYPE "public"."enum_customer_support_status";`)
}
