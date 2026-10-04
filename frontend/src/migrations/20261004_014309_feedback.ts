import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_feedback_status" AS ENUM('open', 'in-progress', 'done');
  CREATE TABLE "feedback" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar NOT NULL,
  	"page" varchar,
  	"screenshot_id" integer,
  	"status" "enum_feedback_status" DEFAULT 'open' NOT NULL,
  	"reporter_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "feedback_screenshots" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "feedback_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "feedback_screenshots_id" integer;
  ALTER TABLE "feedback" ADD CONSTRAINT "feedback_screenshot_id_feedback_screenshots_id_fk" FOREIGN KEY ("screenshot_id") REFERENCES "public"."feedback_screenshots"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "feedback" ADD CONSTRAINT "feedback_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "feedback_screenshot_idx" ON "feedback" USING btree ("screenshot_id");
  CREATE INDEX "feedback_reporter_idx" ON "feedback" USING btree ("reporter_id");
  CREATE INDEX "feedback_updated_at_idx" ON "feedback" USING btree ("updated_at");
  CREATE INDEX "feedback_created_at_idx" ON "feedback" USING btree ("created_at");
  CREATE INDEX "feedback_screenshots_updated_at_idx" ON "feedback_screenshots" USING btree ("updated_at");
  CREATE INDEX "feedback_screenshots_created_at_idx" ON "feedback_screenshots" USING btree ("created_at");
  CREATE UNIQUE INDEX "feedback_screenshots_filename_idx" ON "feedback_screenshots" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feedback_fk" FOREIGN KEY ("feedback_id") REFERENCES "public"."feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feedback_screenshots_fk" FOREIGN KEY ("feedback_screenshots_id") REFERENCES "public"."feedback_screenshots"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_feedback_id_idx" ON "payload_locked_documents_rels" USING btree ("feedback_id");
  CREATE INDEX "payload_locked_documents_rels_feedback_screenshots_id_idx" ON "payload_locked_documents_rels" USING btree ("feedback_screenshots_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "feedback" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "feedback_screenshots" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "feedback" CASCADE;
  DROP TABLE "feedback_screenshots" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_feedback_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_feedback_screenshots_fk";
  
  DROP INDEX "payload_locked_documents_rels_feedback_id_idx";
  DROP INDEX "payload_locked_documents_rels_feedback_screenshots_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "feedback_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "feedback_screenshots_id";
  DROP TYPE "public"."enum_feedback_status";`)
}
