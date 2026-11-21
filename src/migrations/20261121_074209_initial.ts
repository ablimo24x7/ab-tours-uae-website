import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_header_top_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_main_menu_dropdown_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_main_menu_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"active" boolean DEFAULT true,
  	"last_login" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"hero_width_warning" varchar,
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
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_colour_logo_id" integer,
  	"white_logo_id" integer,
  	"favicon_id" integer,
  	"default_social_image_id" integer,
  	"colour_overrides_blue" varchar,
  	"colour_overrides_green" varchar,
  	"colour_overrides_sun" varchar,
  	"colour_overrides_night" varchar,
  	"colour_overrides_cream" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_top_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_header_top_links_link_type" DEFAULT 'internal',
  	"link_internal_path" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header_main_menu_dropdown_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"short_line" varchar,
  	"link_type" "enum_header_main_menu_dropdown_links_link_type" DEFAULT 'internal',
  	"link_internal_path" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header_main_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_header_main_menu_link_type" DEFAULT 'internal',
  	"link_internal_path" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"intro_text" varchar,
  	"feature_photo_id" integer
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar DEFAULT 'A UAE destination management company · Part of AB Group',
  	"cta_label" varchar DEFAULT 'Request a Quote',
  	"cta_link_type" "enum_header_cta_link_type" DEFAULT 'internal',
  	"cta_link_internal_path" varchar,
  	"cta_link_url" varchar,
  	"cta_link_new_tab" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'internal',
  	"link_internal_path" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'internal',
  	"link_internal_path" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar DEFAULT 'A destination management company in the UAE. Part of AB Group.',
  	"bottom_text" varchar DEFAULT '© AB Tours UAE · Part of AB Group',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_details_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "contact_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"office_address" varchar DEFAULT '[Office address]',
  	"phone" varchar DEFAULT '[Phone]',
  	"whatsapp_number" varchar DEFAULT '[Phone]',
  	"email" varchar DEFAULT '[Email]',
  	"office_hours" varchar DEFAULT '[Office hours]',
  	"map_link" varchar,
  	"licence_numbers" varchar DEFAULT '[UAE tourism licence numbers]',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'AB Tours UAE',
  	"seo_title_suffix" varchar DEFAULT ' — AB Tours UAE',
  	"default_seo_description" varchar DEFAULT 'AB Tours UAE — Destination Management Company',
  	"analytics_id" varchar,
  	"not_found_title" varchar DEFAULT 'Page not found',
  	"not_found_text" varchar DEFAULT 'The page you are looking for is not available. Choose one of the sections below to continue.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "form_settings_quote_planning_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "form_settings_budget_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_preferred_contact_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_consultation_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_consultation_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_time_slots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_partner_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings_partner_interests" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "form_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recipients_leisure" varchar,
  	"recipients_outbound" varchar,
  	"recipients_b2b" varchar,
  	"reply_time_promise" varchar DEFAULT '[response time]',
  	"thank_you_heading" varchar DEFAULT 'Your trip is in good hands',
  	"thank_you_text" varchar DEFAULT 'Thank you — in the live site this becomes a lead in the CMS and our team replies.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_full_colour_logo_id_media_id_fk" FOREIGN KEY ("full_colour_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_white_logo_id_media_id_fk" FOREIGN KEY ("white_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_default_social_image_id_media_id_fk" FOREIGN KEY ("default_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_top_links" ADD CONSTRAINT "header_top_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_main_menu_dropdown_links" ADD CONSTRAINT "header_main_menu_dropdown_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_main_menu" ADD CONSTRAINT "header_main_menu_feature_photo_id_media_id_fk" FOREIGN KEY ("feature_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_main_menu" ADD CONSTRAINT "header_main_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_details_social_links" ADD CONSTRAINT "contact_details_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_quote_planning_options" ADD CONSTRAINT "form_settings_quote_planning_options_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_settings_quote_planning_options" ADD CONSTRAINT "form_settings_quote_planning_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_budget_levels" ADD CONSTRAINT "form_settings_budget_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_preferred_contact_methods" ADD CONSTRAINT "form_settings_preferred_contact_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_consultation_topics" ADD CONSTRAINT "form_settings_consultation_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_consultation_methods" ADD CONSTRAINT "form_settings_consultation_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_time_slots" ADD CONSTRAINT "form_settings_time_slots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_partner_types" ADD CONSTRAINT "form_settings_partner_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_settings_partner_interests" ADD CONSTRAINT "form_settings_partner_interests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "branding_full_colour_logo_idx" ON "branding" USING btree ("full_colour_logo_id");
  CREATE INDEX "branding_white_logo_idx" ON "branding" USING btree ("white_logo_id");
  CREATE INDEX "branding_favicon_idx" ON "branding" USING btree ("favicon_id");
  CREATE INDEX "branding_default_social_image_idx" ON "branding" USING btree ("default_social_image_id");
  CREATE INDEX "header_top_links_order_idx" ON "header_top_links" USING btree ("_order");
  CREATE INDEX "header_top_links_parent_id_idx" ON "header_top_links" USING btree ("_parent_id");
  CREATE INDEX "header_main_menu_dropdown_links_order_idx" ON "header_main_menu_dropdown_links" USING btree ("_order");
  CREATE INDEX "header_main_menu_dropdown_links_parent_id_idx" ON "header_main_menu_dropdown_links" USING btree ("_parent_id");
  CREATE INDEX "header_main_menu_order_idx" ON "header_main_menu" USING btree ("_order");
  CREATE INDEX "header_main_menu_parent_id_idx" ON "header_main_menu" USING btree ("_parent_id");
  CREATE INDEX "header_main_menu_feature_photo_idx" ON "header_main_menu" USING btree ("feature_photo_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "contact_details_social_links_order_idx" ON "contact_details_social_links" USING btree ("_order");
  CREATE INDEX "contact_details_social_links_parent_id_idx" ON "contact_details_social_links" USING btree ("_parent_id");
  CREATE INDEX "form_settings_quote_planning_options_order_idx" ON "form_settings_quote_planning_options" USING btree ("_order");
  CREATE INDEX "form_settings_quote_planning_options_parent_id_idx" ON "form_settings_quote_planning_options" USING btree ("_parent_id");
  CREATE INDEX "form_settings_quote_planning_options_photo_idx" ON "form_settings_quote_planning_options" USING btree ("photo_id");
  CREATE INDEX "form_settings_budget_levels_order_idx" ON "form_settings_budget_levels" USING btree ("_order");
  CREATE INDEX "form_settings_budget_levels_parent_id_idx" ON "form_settings_budget_levels" USING btree ("_parent_id");
  CREATE INDEX "form_settings_preferred_contact_methods_order_idx" ON "form_settings_preferred_contact_methods" USING btree ("_order");
  CREATE INDEX "form_settings_preferred_contact_methods_parent_id_idx" ON "form_settings_preferred_contact_methods" USING btree ("_parent_id");
  CREATE INDEX "form_settings_consultation_topics_order_idx" ON "form_settings_consultation_topics" USING btree ("_order");
  CREATE INDEX "form_settings_consultation_topics_parent_id_idx" ON "form_settings_consultation_topics" USING btree ("_parent_id");
  CREATE INDEX "form_settings_consultation_methods_order_idx" ON "form_settings_consultation_methods" USING btree ("_order");
  CREATE INDEX "form_settings_consultation_methods_parent_id_idx" ON "form_settings_consultation_methods" USING btree ("_parent_id");
  CREATE INDEX "form_settings_time_slots_order_idx" ON "form_settings_time_slots" USING btree ("_order");
  CREATE INDEX "form_settings_time_slots_parent_id_idx" ON "form_settings_time_slots" USING btree ("_parent_id");
  CREATE INDEX "form_settings_partner_types_order_idx" ON "form_settings_partner_types" USING btree ("_order");
  CREATE INDEX "form_settings_partner_types_parent_id_idx" ON "form_settings_partner_types" USING btree ("_parent_id");
  CREATE INDEX "form_settings_partner_interests_order_idx" ON "form_settings_partner_interests" USING btree ("_order");
  CREATE INDEX "form_settings_partner_interests_parent_id_idx" ON "form_settings_partner_interests" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "branding" CASCADE;
  DROP TABLE "header_top_links" CASCADE;
  DROP TABLE "header_main_menu_dropdown_links" CASCADE;
  DROP TABLE "header_main_menu" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "contact_details_social_links" CASCADE;
  DROP TABLE "contact_details" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "form_settings_quote_planning_options" CASCADE;
  DROP TABLE "form_settings_budget_levels" CASCADE;
  DROP TABLE "form_settings_preferred_contact_methods" CASCADE;
  DROP TABLE "form_settings_consultation_topics" CASCADE;
  DROP TABLE "form_settings_consultation_methods" CASCADE;
  DROP TABLE "form_settings_time_slots" CASCADE;
  DROP TABLE "form_settings_partner_types" CASCADE;
  DROP TABLE "form_settings_partner_interests" CASCADE;
  DROP TABLE "form_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_header_top_links_link_type";
  DROP TYPE "public"."enum_header_main_menu_dropdown_links_link_type";
  DROP TYPE "public"."enum_header_main_menu_link_type";
  DROP TYPE "public"."enum_header_cta_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";`)
}
