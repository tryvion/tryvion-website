import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_rfp_submissions_secondary_capabilities" AS ENUM('SAP S/4HANA', 'SAP SuccessFactors', 'SAP Business Technology Platform (BTP)', 'SAP Ariba', 'SAP Customer Experience', 'Enterprise AI Strategy', 'Enterprise AI Platforms', 'Intelligent Automation', 'Data & Analytics', 'Cloud Transformation', 'Enterprise Integration', 'Digital Engineering', 'SAP Talent Solutions', 'Permanent Hiring', 'Executive Search', 'TRYVION Academy / Learning', 'Managed Services / SAP Run in the New', 'Business Transformation', 'Multiple / Cross-Capability', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_affected_functions" AS ENUM('Finance', 'Procurement', 'Supply Chain', 'Manufacturing', 'Sales', 'Marketing', 'Customer Service', 'Human Resources', 'IT / Technology', 'Data & Analytics', 'Cybersecurity', 'Operations', 'Legal / Compliance', 'Strategy / Transformation Office', 'Executive / Corporate Functions', 'Multiple / Enterprise-Wide', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_existing_technology_stack" AS ENUM('SAP', 'Oracle', 'Microsoft', 'Salesforce', 'Workday', 'ServiceNow', 'AWS', 'Microsoft Azure', 'Google Cloud', 'Snowflake', 'Databricks', 'Other', 'None / Greenfield');
  CREATE TYPE "public"."enum_rfp_submissions_documents_document_type" AS ENUM('RFP / RFQ', 'Statement of Work', 'Technical Requirements', 'Commercial / Pricing Schedule', 'Architecture / Process Documentation', 'Business Requirements', 'Existing Solution Documentation', 'Supporting Document', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_industry_sector" AS ENUM('Consumer Products', 'Retail', 'Fashion', 'Wholesale & Distribution', 'Life Sciences', 'Agribusiness', 'Financial Services', 'Banking', 'Insurance', 'Public Sector', 'Healthcare', 'Education & Research', 'Defence & Security', 'Industrial Manufacturing', 'High Tech', 'Automotive', 'Aerospace & Defence', 'Energy & Utilities', 'Mining', 'Chemicals', 'Oil & Gas', 'Construction & Operations', 'Commercial Real Estate', 'Sports & Entertainment', 'Travel & Leisure', 'Professional Services', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_organisation_size" AS ENUM('1–499 employees', '500–4,999 employees', '5,000–24,999 employees', '25,000–49,999 employees', '50,000+ employees');
  CREATE TYPE "public"."enum_rfp_submissions_business_function" AS ENUM('Executive / Leadership', 'IT / Technology', 'Digital Transformation', 'Finance', 'Procurement', 'Operations', 'Human Resources', 'Supply Chain', 'Sales / Commercial', 'Strategy', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_procurement_involvement" AS ENUM('Procurement Lead', 'Business Sponsor', 'Technology / IT Lead', 'Transformation Lead', 'Project / Programme Manager', 'Executive Decision Maker', 'Procurement + Business Sponsor', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_primary_capability" AS ENUM('SAP S/4HANA', 'SAP SuccessFactors', 'SAP Business Technology Platform (BTP)', 'SAP Ariba', 'SAP Customer Experience', 'Enterprise AI Strategy', 'Enterprise AI Platforms', 'Intelligent Automation', 'Data & Analytics', 'Cloud Transformation', 'Enterprise Integration', 'Digital Engineering', 'SAP Talent Solutions', 'Permanent Hiring', 'Executive Search', 'TRYVION Academy / Learning', 'Managed Services / SAP Run in the New', 'Business Transformation', 'Multiple / Cross-Capability', 'Other');
  CREATE TYPE "public"."enum_rfp_submissions_deployment_scale" AS ENUM('Single Business Unit', 'Single Country', 'Multiple Countries', 'Regional', 'Global', 'Enterprise-Wide', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_transformation_stage" AS ENUM('Exploring / Early Discovery', 'Business Case Development', 'Requirements Definition', 'Solution Evaluation', 'RFI / Market Research', 'RFP / Tender Preparation', 'RFP / Tender Issued', 'Vendor Shortlisting', 'Final Evaluation', 'Contract / Commercial Negotiation', 'Implementation Planning', 'Existing Programme / Transformation', 'Optimisation / Managed Services', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_procurement_stage" AS ENUM('Internal Requirement Identified', 'Business Case Approved', 'Market Research / RFI', 'RFP / RFQ Preparation', 'RFP / RFQ Issued', 'Vendor Evaluation', 'Shortlisting', 'Commercial Negotiation', 'Final Approval', 'Award Pending', 'Direct Procurement / No Formal Tender', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_engagement_duration" AS ENUM('Less than 3 months', '3–6 months', '6–12 months', '12–24 months', '24+ months', 'Ongoing / Managed Service', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_commercial_model" AS ENUM('Fixed Price', 'Time & Materials', 'Managed Services', 'Subscription / Recurring', 'Outcome-Based', 'Milestone-Based', 'Hybrid', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_budget_range" AS ENUM('Not Yet Determined', 'Under USD 50K', 'USD 50K – 250K', 'USD 250K – 1M', 'USD 1M – 5M', 'USD 5M+', 'Prefer Not to Disclose');
  CREATE TYPE "public"."enum_rfp_submissions_delivery_model" AS ENUM('Onsite', 'Remote', 'Hybrid', 'Global Delivery', 'Regional Delivery', 'Not Yet Determined');
  CREATE TYPE "public"."enum_rfp_submissions_submission_status" AS ENUM('New', 'Under Review', 'Qualified', 'Proposal in Preparation', 'Proposal Submitted', 'Won', 'Lost', 'On Hold', 'Disqualified');
  CREATE TYPE "public"."enum_rfp_submissions_lead_priority" AS ENUM('Low', 'Medium', 'High', 'Critical');
  CREATE TYPE "public"."enum_rfp_submissions_qualification_status" AS ENUM('Not Reviewed', 'Pending Qualification', 'Qualified', 'Unqualified', 'Needs More Information');
  CREATE TYPE "public"."enum_rfp_submissions_account_status" AS ENUM('Prospect', 'Existing Customer', 'Former Customer', 'Strategic Account', 'Partner / Alliance', 'Unknown');
  CREATE TABLE "rfp_submissions_secondary_capabilities" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rfp_submissions_secondary_capabilities",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rfp_submissions_affected_functions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rfp_submissions_affected_functions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rfp_submissions_existing_technology_stack" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_rfp_submissions_existing_technology_stack",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "rfp_submissions_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"document_type" "enum_rfp_submissions_documents_document_type" NOT NULL,
  	"document_description" varchar,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "rfp_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organisation_legal_name" varchar NOT NULL,
  	"organisation_website" varchar NOT NULL,
  	"industry_sector" "enum_rfp_submissions_industry_sector" NOT NULL,
  	"headquarters_country" varchar NOT NULL,
  	"primary_operating_market" varchar NOT NULL,
  	"organisation_size" "enum_rfp_submissions_organisation_size" NOT NULL,
  	"business_function" "enum_rfp_submissions_business_function" NOT NULL,
  	"proposal_contact_name" varchar NOT NULL,
  	"proposal_contact_role" varchar NOT NULL,
  	"procurement_involvement" "enum_rfp_submissions_procurement_involvement" NOT NULL,
  	"proposal_contact_email" varchar NOT NULL,
  	"proposal_contact_phone" varchar,
  	"initiative_name" varchar NOT NULL,
  	"transformation_objective" varchar NOT NULL,
  	"business_challenge" varchar NOT NULL,
  	"desired_outcomes" varchar NOT NULL,
  	"primary_capability" "enum_rfp_submissions_primary_capability" NOT NULL,
  	"target_geography" varchar NOT NULL,
  	"estimated_user_count" numeric,
  	"deployment_scale" "enum_rfp_submissions_deployment_scale",
  	"transformation_stage" "enum_rfp_submissions_transformation_stage" NOT NULL,
  	"scope_of_work" varchar NOT NULL,
  	"expected_deliverables" varchar NOT NULL,
  	"functional_requirements" varchar,
  	"technical_requirements" varchar,
  	"integration_requirements" varchar,
  	"data_migration_requirements" varchar,
  	"security_compliance_requirements" varchar,
  	"reporting_requirements" varchar,
  	"service_level_requirements" varchar,
  	"existing_technology_landscape" varchar,
  	"constraints_dependencies" varchar,
  	"success_measures" varchar,
  	"procurement_reference" varchar,
  	"rfp_reference" varchar,
  	"procurement_stage" "enum_rfp_submissions_procurement_stage" NOT NULL,
  	"proposal_deadline" timestamp(3) with time zone,
  	"expected_award_date" timestamp(3) with time zone,
  	"expected_start_date" timestamp(3) with time zone,
  	"engagement_duration" "enum_rfp_submissions_engagement_duration",
  	"commercial_model" "enum_rfp_submissions_commercial_model",
  	"budget_range" "enum_rfp_submissions_budget_range",
  	"proposal_currency" varchar,
  	"contracting_entity_country" varchar,
  	"delivery_model" "enum_rfp_submissions_delivery_model",
  	"delivery_locations" varchar,
  	"privacy_consent" boolean DEFAULT false NOT NULL,
  	"marketing_consent" boolean DEFAULT false,
  	"consent_timestamp" timestamp(3) with time zone,
  	"consent_version" varchar,
  	"privacy_policy_version" varchar,
  	"submission_id" varchar,
  	"form_type" varchar DEFAULT 'RFP',
  	"source_url" varchar,
  	"source_page" varchar,
  	"landing_page" varchar,
  	"referrer_url" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"utm_term" varchar,
  	"utm_content" varchar,
  	"service_context" varchar,
  	"industry_context" varchar,
  	"locale" varchar,
  	"user_agent" varchar,
  	"submission_status" "enum_rfp_submissions_submission_status" DEFAULT 'New',
  	"lead_priority" "enum_rfp_submissions_lead_priority",
  	"lead_score" numeric,
  	"qualification_status" "enum_rfp_submissions_qualification_status" DEFAULT 'Not Reviewed',
  	"assigned_owner" varchar,
  	"assigned_team" varchar,
  	"market" varchar,
  	"sales_region" varchar,
  	"account_status" "enum_rfp_submissions_account_status",
  	"internal_notes" varchar,
  	"follow_up_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rfp_submissions_id" integer;
  ALTER TABLE "rfp_submissions_secondary_capabilities" ADD CONSTRAINT "rfp_submissions_secondary_capabilities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rfp_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rfp_submissions_affected_functions" ADD CONSTRAINT "rfp_submissions_affected_functions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rfp_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rfp_submissions_existing_technology_stack" ADD CONSTRAINT "rfp_submissions_existing_technology_stack_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rfp_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rfp_submissions_documents" ADD CONSTRAINT "rfp_submissions_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rfp_submissions_documents" ADD CONSTRAINT "rfp_submissions_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rfp_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "rfp_submissions_secondary_capabilities_order_idx" ON "rfp_submissions_secondary_capabilities" USING btree ("order");
  CREATE INDEX "rfp_submissions_secondary_capabilities_parent_idx" ON "rfp_submissions_secondary_capabilities" USING btree ("parent_id");
  CREATE INDEX "rfp_submissions_affected_functions_order_idx" ON "rfp_submissions_affected_functions" USING btree ("order");
  CREATE INDEX "rfp_submissions_affected_functions_parent_idx" ON "rfp_submissions_affected_functions" USING btree ("parent_id");
  CREATE INDEX "rfp_submissions_existing_technology_stack_order_idx" ON "rfp_submissions_existing_technology_stack" USING btree ("order");
  CREATE INDEX "rfp_submissions_existing_technology_stack_parent_idx" ON "rfp_submissions_existing_technology_stack" USING btree ("parent_id");
  CREATE INDEX "rfp_submissions_documents_order_idx" ON "rfp_submissions_documents" USING btree ("_order");
  CREATE INDEX "rfp_submissions_documents_parent_id_idx" ON "rfp_submissions_documents" USING btree ("_parent_id");
  CREATE INDEX "rfp_submissions_documents_file_idx" ON "rfp_submissions_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "rfp_submissions_submission_id_idx" ON "rfp_submissions" USING btree ("submission_id");
  CREATE INDEX "rfp_submissions_updated_at_idx" ON "rfp_submissions" USING btree ("updated_at");
  CREATE INDEX "rfp_submissions_created_at_idx" ON "rfp_submissions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rfp_submissions_fk" FOREIGN KEY ("rfp_submissions_id") REFERENCES "public"."rfp_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_rfp_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("rfp_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rfp_submissions_secondary_capabilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rfp_submissions_affected_functions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rfp_submissions_existing_technology_stack" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rfp_submissions_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rfp_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "rfp_submissions_secondary_capabilities" CASCADE;
  DROP TABLE "rfp_submissions_affected_functions" CASCADE;
  DROP TABLE "rfp_submissions_existing_technology_stack" CASCADE;
  DROP TABLE "rfp_submissions_documents" CASCADE;
  DROP TABLE "rfp_submissions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rfp_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_rfp_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rfp_submissions_id";
  DROP TYPE "public"."enum_rfp_submissions_secondary_capabilities";
  DROP TYPE "public"."enum_rfp_submissions_affected_functions";
  DROP TYPE "public"."enum_rfp_submissions_existing_technology_stack";
  DROP TYPE "public"."enum_rfp_submissions_documents_document_type";
  DROP TYPE "public"."enum_rfp_submissions_industry_sector";
  DROP TYPE "public"."enum_rfp_submissions_organisation_size";
  DROP TYPE "public"."enum_rfp_submissions_business_function";
  DROP TYPE "public"."enum_rfp_submissions_procurement_involvement";
  DROP TYPE "public"."enum_rfp_submissions_primary_capability";
  DROP TYPE "public"."enum_rfp_submissions_deployment_scale";
  DROP TYPE "public"."enum_rfp_submissions_transformation_stage";
  DROP TYPE "public"."enum_rfp_submissions_procurement_stage";
  DROP TYPE "public"."enum_rfp_submissions_engagement_duration";
  DROP TYPE "public"."enum_rfp_submissions_commercial_model";
  DROP TYPE "public"."enum_rfp_submissions_budget_range";
  DROP TYPE "public"."enum_rfp_submissions_delivery_model";
  DROP TYPE "public"."enum_rfp_submissions_submission_status";
  DROP TYPE "public"."enum_rfp_submissions_lead_priority";
  DROP TYPE "public"."enum_rfp_submissions_qualification_status";
  DROP TYPE "public"."enum_rfp_submissions_account_status";`)
}
