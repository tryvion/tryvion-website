import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_customer_support_intent"
      AS ENUM('expert', 'consultation', 'support');

    CREATE TYPE "public"."enum_customer_support_service_interest"
      AS ENUM(
        'SAP S/4HANA',
        'SAP SuccessFactors',
        'SAP Business Technology Platform (BTP)',
        'SAP Ariba',
        'SAP Customer Experience',
        'Enterprise AI Strategy',
        'Enterprise AI Platforms',
        'Intelligent Automation',
        'Data & Analytics',
        'Cloud Transformation',
        'Enterprise Integration',
        'Digital Engineering',
        'SAP Talent Solutions',
        'Permanent Hiring',
        'Executive Search',
        'TRYVION Academy / Learning',
        'Managed Services / SAP Run in the New',
        'Business Transformation',
        'Multiple / Cross-Capability',
        'Other'
      );

    CREATE TYPE "public"."enum_customer_support_preferred_contact_method"
      AS ENUM('email', 'phone', 'video_call');

    /*
     * Existing production records use the old support_area enum.
     * Convert to text first so existing values can be mapped safely.
     */
    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area" SET DATA TYPE text;

    DROP TYPE "public"."enum_customer_support_support_area";

    CREATE TYPE "public"."enum_customer_support_support_area"
      AS ENUM(
        'SAP S/4HANA',
        'SAP SuccessFactors',
        'SAP Business Technology Platform (BTP)',
        'SAP Ariba',
        'SAP Customer Experience',
        'Enterprise AI & Automation',
        'Data & Analytics',
        'Cloud & Infrastructure',
        'Enterprise Integration',
        'Digital Engineering',
        'Managed Services / SAP Run in the New',
        'Talent & Learning Platforms',
        'Security & Access',
        'Performance & Availability',
        'Incident / Service Disruption',
        'Other Support Enquiry'
      );

    /*
     * Preserve existing production support records.
     *
     * Old values:
     *   SAP Applications
     *   AI & Automation
     *   Integration & Technology
     *   Operate
     *   Other Enquiry
     *
     * New values:
     *   SAP-specific categories
     *   Enterprise AI & Automation
     *   Enterprise Integration
     *   Managed Services / SAP Run in the New
     *   Other Support Enquiry
     */
    UPDATE "customer_support"
    SET "support_area" =
      CASE "support_area"
        WHEN 'SAP Applications'
          THEN 'Other Support Enquiry'
        WHEN 'AI & Automation'
          THEN 'Enterprise AI & Automation'
        WHEN 'Integration & Technology'
          THEN 'Enterprise Integration'
        WHEN 'Operate'
          THEN 'Managed Services / SAP Run in the New'
        WHEN 'Other Enquiry'
          THEN 'Other Support Enquiry'
        ELSE 'Other Support Enquiry'
      END;

    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area"
      SET DATA TYPE "public"."enum_customer_support_support_area"
      USING "support_area"::"public"."enum_customer_support_support_area";

    /*
     * These fields are now conditional based on intent.
     * They cannot remain globally NOT NULL.
     */
    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area" DROP NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "support_priority" DROP NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "issue" DROP NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "source"
      SET DEFAULT 'website-contact-engagement';

    /*
     * Add new columns as nullable first.
     * This allows existing production records to survive.
     */
    ALTER TABLE "customer_support"
      ADD COLUMN "intent" "public"."enum_customer_support_intent";

    ALTER TABLE "customer_support"
      ADD COLUMN "service_interest"
      "public"."enum_customer_support_service_interest";

    ALTER TABLE "customer_support"
      ADD COLUMN "business_challenge" varchar;

    ALTER TABLE "customer_support"
      ADD COLUMN "preferred_consultation_date"
      timestamp(3) with time zone;

    ALTER TABLE "customer_support"
      ADD COLUMN "preferred_consultation_time" varchar;

    ALTER TABLE "customer_support"
      ADD COLUMN "preferred_contact_method"
      "public"."enum_customer_support_preferred_contact_method";

    /*
     * Existing records came from the original Customer Support form,
     * therefore their intent is "support".
     */
    UPDATE "customer_support"
    SET "intent" = 'support'
    WHERE "intent" IS NULL;

    /*
     * All existing and future records must have an intent.
     */
    ALTER TABLE "customer_support"
      ALTER COLUMN "intent" SET NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area" SET DATA TYPE text;

    DROP TYPE "public"."enum_customer_support_support_area";

    CREATE TYPE "public"."enum_customer_support_support_area"
      AS ENUM(
        'SAP Applications',
        'AI & Automation',
        'Integration & Technology',
        'Operate',
        'Other Enquiry'
      );

    /*
     * Convert the new support areas back to the legacy categories.
     */
    UPDATE "customer_support"
    SET "support_area" =
      CASE "support_area"
        WHEN 'Enterprise AI & Automation'
          THEN 'AI & Automation'
        WHEN 'Enterprise Integration'
          THEN 'Integration & Technology'
        WHEN 'Managed Services / SAP Run in the New'
          THEN 'Operate'
        WHEN 'SAP S/4HANA'
          THEN 'SAP Applications'
        WHEN 'SAP SuccessFactors'
          THEN 'SAP Applications'
        WHEN 'SAP Business Technology Platform (BTP)'
          THEN 'SAP Applications'
        WHEN 'SAP Ariba'
          THEN 'SAP Applications'
        WHEN 'SAP Customer Experience'
          THEN 'SAP Applications'
        WHEN 'Other Support Enquiry'
          THEN 'Other Enquiry'
        ELSE 'Other Enquiry'
      END;

    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area"
      SET DATA TYPE "public"."enum_customer_support_support_area"
      USING "support_area"::"public"."enum_customer_support_support_area";

    ALTER TABLE "customer_support"
      ALTER COLUMN "support_area" SET NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "support_priority" SET NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "issue" SET NOT NULL;

    ALTER TABLE "customer_support"
      ALTER COLUMN "source"
      SET DEFAULT 'website-customer-support';

    ALTER TABLE "customer_support"
      DROP COLUMN "intent";

    ALTER TABLE "customer_support"
      DROP COLUMN "service_interest";

    ALTER TABLE "customer_support"
      DROP COLUMN "business_challenge";

    ALTER TABLE "customer_support"
      DROP COLUMN "preferred_consultation_date";

    ALTER TABLE "customer_support"
      DROP COLUMN "preferred_consultation_time";

    ALTER TABLE "customer_support"
      DROP COLUMN "preferred_contact_method";

    DROP TYPE "public"."enum_customer_support_intent";

    DROP TYPE "public"."enum_customer_support_service_interest";

    DROP TYPE "public"."enum_customer_support_preferred_contact_method";
  `)
}
