import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'ar');
  CREATE TYPE "public"."action_type" AS ENUM('link', 'linkIcon', 'linkIconOnly', 'button', 'buttonIcon', 'buttonIconOnly');
  CREATE TYPE "public"."icon_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."link_color" AS ENUM('foreground', 'primary', 'secondary', 'success', 'warning');
  CREATE TYPE "public"."link_variant" AS ENUM('default', 'underline');
  CREATE TYPE "public"."btn_color" AS ENUM('default', 'primary', 'secondary', 'success', 'danger', 'warning');
  CREATE TYPE "public"."btn_variant" AS ENUM('light', 'solid', 'ghost', 'faded', 'flat', 'shadow', 'bordered');
  CREATE TYPE "public"."content_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."card_block_type" AS ENUM('cards', 'list');
  CREATE TYPE "public"."field_type" AS ENUM('textInput', 'emailInput', 'phoneInput', 'textareaInput', 'select', 'checkbox', 'radio');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'de', 'ar');
  CREATE TYPE "public"."include_products" AS ENUM('bySlug');
  CREATE TYPE "public"."enum_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_published_locale" AS ENUM('en', 'de', 'ar');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'de', 'ar');
  CREATE TYPE "public"."enum_templates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__templates_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__templates_v_published_locale" AS ENUM('en', 'de', 'ar');
  CREATE TYPE "public"."role" AS ENUM('admin', 'root');
  CREATE TYPE "public"."social_platform" AS ENUM('facebook', 'instagram', 'x', 'linkedin', 'youtube', 'tiktok', 'pinterest', 'reddit', 'snapchat', 'twitch', 'discord', 'telegram', 'whatsapp', 'skype', 'viber');
  CREATE TYPE "public"."enum_layout_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__layout_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__layout_v_published_locale" AS ENUM('en', 'de', 'ar');
  CREATE TABLE "pages_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"template_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE "pages_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "pages_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" uuid
  );
  
  CREATE TABLE "pages_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar
  );
  
  CREATE TABLE "pages_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar DEFAULT 'Home Page',
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"blocks_info" varchar,
  	"seo_info" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"template_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"category_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_name" varchar DEFAULT 'Home Page',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_blocks_info" varchar,
  	"version_seo_info" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "categories_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"template_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE "categories_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "categories_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "categories_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "categories_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" uuid
  );
  
  CREATE TABLE "categories_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar
  );
  
  CREATE TABLE "categories_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "categories_blocks_products_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"include_products" "include_products" DEFAULT 'bySlug',
  	"block_name" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"name" varchar,
  	"image_id" uuid,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "categories_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_categories_v_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"template_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"category_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v_blocks_products_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"include_products" "include_products" DEFAULT 'bySlug',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_categories_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_name" varchar,
  	"version_image_id" uuid,
  	"version_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__categories_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_categories_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "products_details_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_svg" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "products_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "products_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"template_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE "products_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "products_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "products_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "products_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" uuid
  );
  
  CREATE TABLE "products_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar
  );
  
  CREATE TABLE "products_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "products" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_products_products_order" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"is_best_choice" boolean DEFAULT false,
  	"is_value_for_money" boolean DEFAULT false,
  	"has_discount" boolean DEFAULT false,
  	"has_details" boolean DEFAULT false,
  	"image_id" uuid,
  	"short_name" varchar,
  	"full_name" varchar,
  	"estimated_price" numeric,
  	"discount_percent" numeric,
  	"categories_id" uuid,
  	"product_link" varchar,
  	"rank_value" numeric DEFAULT 9.5,
  	"rank_label" varchar DEFAULT 'Exceptional',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_products_v_version_details_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon_svg" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_template_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"template_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"category_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version__products_products_order" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_is_best_choice" boolean DEFAULT false,
  	"version_is_value_for_money" boolean DEFAULT false,
  	"version_has_discount" boolean DEFAULT false,
  	"version_has_details" boolean DEFAULT false,
  	"version_image_id" uuid,
  	"version_short_name" varchar,
  	"version_full_name" varchar,
  	"version_estimated_price" numeric,
  	"version_discount_percent" numeric,
  	"version_categories_id" uuid,
  	"version_product_link" varchar,
  	"version_rank_value" numeric DEFAULT 9.5,
  	"version_rank_label" varchar DEFAULT 'Exceptional',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "templates_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid
  );
  
  CREATE TABLE "templates_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "templates_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "templates_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid
  );
  
  CREATE TABLE "templates_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" uuid
  );
  
  CREATE TABLE "templates_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "templates_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar
  );
  
  CREATE TABLE "templates_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "templates" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_templates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_templates_v_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_image_scroller_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_image_scroller_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"content" jsonb,
  	"content_alignment" "content_align" DEFAULT 'left',
  	"text_alignment" text_align DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_list_block_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"title" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"action_action_type" "action_type" DEFAULT 'button',
  	"action_text" varchar,
  	"action_url" varchar,
  	"action_icon_svg" varchar,
  	"action_icon_position" "icon_position" DEFAULT 'left',
  	"action_link_color" "link_color" DEFAULT 'foreground',
  	"action_link_variant" "link_variant" DEFAULT 'underline',
  	"action_button_color" "btn_color" DEFAULT 'primary',
  	"action_button_variant" "btn_variant" DEFAULT 'solid',
  	"action_as_link" boolean DEFAULT false,
  	"action_open_in_new_tab" boolean DEFAULT false,
  	"show_action" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_tabs_block_tabs_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_tabs_block_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"label" varchar,
  	"icon" varchar,
  	"title" varchar,
  	"image_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_tabs_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_categories_block_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"category_id" uuid,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_categories_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"card_block_type" "card_block_type" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_feedback_block_form_field_field_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"field_option_label" varchar,
  	"field_option_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_templates_v_blocks_feedback_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"form_field_field_type" "field_type" DEFAULT 'emailInput',
  	"form_field_field_label" varchar,
  	"form_field_field_placeholder" varchar,
  	"form_field_field_is_required" boolean DEFAULT false,
  	"form_field_field_info_message" varchar,
  	"form_field_field_error_message" varchar,
  	"form_action_action_type" "action_type" DEFAULT 'button',
  	"form_action_text" varchar,
  	"form_action_url" varchar,
  	"form_action_icon_svg" varchar,
  	"form_action_icon_position" "icon_position" DEFAULT 'left',
  	"form_action_link_color" "link_color" DEFAULT 'foreground',
  	"form_action_link_variant" "link_variant" DEFAULT 'underline',
  	"form_action_button_color" "btn_color" DEFAULT 'primary',
  	"form_action_button_variant" "btn_variant" DEFAULT 'solid',
  	"form_action_as_link" boolean DEFAULT false,
  	"form_action_open_in_new_tab" boolean DEFAULT false,
  	"show_submit_button" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_templates_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_name" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__templates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__templates_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "images" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar DEFAULT 'image' NOT NULL,
  	"prefix" varchar DEFAULT 'images',
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
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"role" "role" DEFAULT 'admin',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid,
  	"categories_id" uuid,
  	"products_id" uuid,
  	"templates_id" uuid,
  	"images_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "layout_blocks_header_block_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "action_type" DEFAULT 'button',
  	"text" varchar,
  	"url" varchar,
  	"icon_svg" varchar,
  	"icon_position" "icon_position" DEFAULT 'left',
  	"link_color" "link_color" DEFAULT 'foreground',
  	"link_variant" "link_variant" DEFAULT 'underline',
  	"button_color" "btn_color" DEFAULT 'primary',
  	"button_variant" "btn_variant" DEFAULT 'solid',
  	"as_link" boolean DEFAULT false,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "layout_blocks_header_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "layout_blocks_footer_block_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "action_type" DEFAULT 'link',
  	"text" varchar,
  	"url" varchar,
  	"icon_svg" varchar,
  	"icon_position" "icon_position" DEFAULT 'left',
  	"link_color" "link_color" DEFAULT 'foreground',
  	"link_variant" "link_variant" DEFAULT 'underline',
  	"button_color" "btn_color" DEFAULT 'primary',
  	"button_variant" "btn_variant" DEFAULT 'solid',
  	"as_link" boolean DEFAULT false,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "layout_blocks_footer_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "layout_blocks_footer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"copyright_text" varchar DEFAULT '© 2025 All rights reserved.',
  	"copyright_text_alignment" text_align DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "layout_branding_social_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"social_platform" "social_platform" DEFAULT 'facebook',
  	"social_url" varchar,
  	"social_icon_svg" varchar
  );
  
  CREATE TABLE "layout" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"branding_logo_image_id" uuid,
  	"branding_logo_icon_svg" varchar,
  	"branding_logo_as_icon_svg" boolean DEFAULT false,
  	"branding_favicon_id" uuid,
  	"_status" "enum_layout_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "layout_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_layout_v_blocks_header_block_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"action_type" "action_type" DEFAULT 'button',
  	"text" varchar,
  	"url" varchar,
  	"icon_svg" varchar,
  	"icon_position" "icon_position" DEFAULT 'left',
  	"link_color" "link_color" DEFAULT 'foreground',
  	"link_variant" "link_variant" DEFAULT 'underline',
  	"button_color" "btn_color" DEFAULT 'primary',
  	"button_variant" "btn_variant" DEFAULT 'solid',
  	"as_link" boolean DEFAULT false,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_layout_v_blocks_header_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_layout_v_blocks_footer_block_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"action_type" "action_type" DEFAULT 'link',
  	"text" varchar,
  	"url" varchar,
  	"icon_svg" varchar,
  	"icon_position" "icon_position" DEFAULT 'left',
  	"link_color" "link_color" DEFAULT 'foreground',
  	"link_variant" "link_variant" DEFAULT 'underline',
  	"button_color" "btn_color" DEFAULT 'primary',
  	"button_variant" "btn_variant" DEFAULT 'solid',
  	"as_link" boolean DEFAULT false,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_layout_v_blocks_footer_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_layout_v_blocks_footer_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"copyright_text" varchar DEFAULT '© 2025 All rights reserved.',
  	"copyright_text_alignment" text_align DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_layout_v_version_branding_social_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"social_platform" "social_platform" DEFAULT 'facebook',
  	"social_url" varchar,
  	"social_icon_svg" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_layout_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"version_branding_logo_image_id" uuid,
  	"version_branding_logo_icon_svg" varchar,
  	"version_branding_logo_as_icon_svg" boolean DEFAULT false,
  	"version_branding_favicon_id" uuid,
  	"version__status" "enum__layout_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__layout_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_layout_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "pages_blocks_template_block" ADD CONSTRAINT "pages_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_template_block" ADD CONSTRAINT "pages_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_scroller_block_rows" ADD CONSTRAINT "pages_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_scroller_block_rows" ADD CONSTRAINT "pages_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_scroller_block" ADD CONSTRAINT "pages_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_block" ADD CONSTRAINT "pages_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block_rows" ADD CONSTRAINT "pages_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block_rows" ADD CONSTRAINT "pages_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_block" ADD CONSTRAINT "pages_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "pages_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_block_tabs" ADD CONSTRAINT "pages_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_block_tabs" ADD CONSTRAINT "pages_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_block" ADD CONSTRAINT "pages_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_categories_block_categories" ADD CONSTRAINT "pages_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_categories_block_categories" ADD CONSTRAINT "pages_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_categories_block" ADD CONSTRAINT "pages_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "pages_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feedback_block" ADD CONSTRAINT "pages_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_images_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_template_block" ADD CONSTRAINT "_pages_v_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_template_block" ADD CONSTRAINT "_pages_v_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD CONSTRAINT "_pages_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_pages_v_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_pages_v_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_scroller_block" ADD CONSTRAINT "_pages_v_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_block" ADD CONSTRAINT "_pages_v_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_rows" ADD CONSTRAINT "_pages_v_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block_rows" ADD CONSTRAINT "_pages_v_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_block" ADD CONSTRAINT "_pages_v_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "_pages_v_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_block" ADD CONSTRAINT "_pages_v_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_categories_block_categories" ADD CONSTRAINT "_pages_v_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_categories_block_categories" ADD CONSTRAINT "_pages_v_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_categories_block" ADD CONSTRAINT "_pages_v_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "_pages_v_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feedback_block" ADD CONSTRAINT "_pages_v_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_images_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_template_block" ADD CONSTRAINT "categories_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_template_block" ADD CONSTRAINT "categories_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_hero_block" ADD CONSTRAINT "categories_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_hero_block" ADD CONSTRAINT "categories_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_image_scroller_block_rows" ADD CONSTRAINT "categories_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_image_scroller_block_rows" ADD CONSTRAINT "categories_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_image_scroller_block" ADD CONSTRAINT "categories_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_section_block" ADD CONSTRAINT "categories_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_list_block_rows" ADD CONSTRAINT "categories_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_list_block_rows" ADD CONSTRAINT "categories_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_list_block" ADD CONSTRAINT "categories_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "categories_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_tabs_block_tabs" ADD CONSTRAINT "categories_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_tabs_block_tabs" ADD CONSTRAINT "categories_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_tabs_block" ADD CONSTRAINT "categories_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_categories_block_categories" ADD CONSTRAINT "categories_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_blocks_categories_block_categories" ADD CONSTRAINT "categories_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_categories_block" ADD CONSTRAINT "categories_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "categories_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_feedback_block" ADD CONSTRAINT "categories_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_blocks_products_block" ADD CONSTRAINT "categories_blocks_products_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_meta_image_id_images_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_template_block" ADD CONSTRAINT "_categories_v_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_template_block" ADD CONSTRAINT "_categories_v_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_hero_block" ADD CONSTRAINT "_categories_v_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_hero_block" ADD CONSTRAINT "_categories_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_categories_v_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_categories_v_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_image_scroller_block" ADD CONSTRAINT "_categories_v_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_section_block" ADD CONSTRAINT "_categories_v_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_list_block_rows" ADD CONSTRAINT "_categories_v_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_list_block_rows" ADD CONSTRAINT "_categories_v_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_list_block" ADD CONSTRAINT "_categories_v_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "_categories_v_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_categories_v_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_categories_v_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_tabs_block" ADD CONSTRAINT "_categories_v_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_categories_block_categories" ADD CONSTRAINT "_categories_v_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_categories_block_categories" ADD CONSTRAINT "_categories_v_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_categories_block" ADD CONSTRAINT "_categories_v_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "_categories_v_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_feedback_block" ADD CONSTRAINT "_categories_v_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_blocks_products_block" ADD CONSTRAINT "_categories_v_blocks_products_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_image_id_images_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_version_meta_image_id_images_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details_rows" ADD CONSTRAINT "products_details_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_details" ADD CONSTRAINT "products_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_template_block" ADD CONSTRAINT "products_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_template_block" ADD CONSTRAINT "products_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_block" ADD CONSTRAINT "products_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_block" ADD CONSTRAINT "products_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_scroller_block_rows" ADD CONSTRAINT "products_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_image_scroller_block_rows" ADD CONSTRAINT "products_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_image_scroller_block" ADD CONSTRAINT "products_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_section_block" ADD CONSTRAINT "products_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_list_block_rows" ADD CONSTRAINT "products_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_list_block_rows" ADD CONSTRAINT "products_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_list_block" ADD CONSTRAINT "products_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "products_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_tabs_block_tabs" ADD CONSTRAINT "products_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_tabs_block_tabs" ADD CONSTRAINT "products_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_tabs_block" ADD CONSTRAINT "products_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_categories_block_categories" ADD CONSTRAINT "products_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_categories_block_categories" ADD CONSTRAINT "products_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_categories_block" ADD CONSTRAINT "products_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "products_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_feedback_block" ADD CONSTRAINT "products_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_categories_id_categories_id_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_images_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details_rows" ADD CONSTRAINT "_products_v_version_details_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_details" ADD CONSTRAINT "_products_v_version_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_template_block" ADD CONSTRAINT "_products_v_blocks_template_block_template_id_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_template_block" ADD CONSTRAINT "_products_v_blocks_template_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_block" ADD CONSTRAINT "_products_v_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_block" ADD CONSTRAINT "_products_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_products_v_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_products_v_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_image_scroller_block" ADD CONSTRAINT "_products_v_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_section_block" ADD CONSTRAINT "_products_v_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_list_block_rows" ADD CONSTRAINT "_products_v_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_list_block_rows" ADD CONSTRAINT "_products_v_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_list_block" ADD CONSTRAINT "_products_v_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "_products_v_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_products_v_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_products_v_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_tabs_block" ADD CONSTRAINT "_products_v_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_categories_block_categories" ADD CONSTRAINT "_products_v_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_categories_block_categories" ADD CONSTRAINT "_products_v_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_categories_block" ADD CONSTRAINT "_products_v_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "_products_v_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_feedback_block" ADD CONSTRAINT "_products_v_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_image_id_images_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_categories_id_categories_id_fk" FOREIGN KEY ("version_categories_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_meta_image_id_images_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_hero_block" ADD CONSTRAINT "templates_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_hero_block" ADD CONSTRAINT "templates_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_image_scroller_block_rows" ADD CONSTRAINT "templates_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_image_scroller_block_rows" ADD CONSTRAINT "templates_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_image_scroller_block" ADD CONSTRAINT "templates_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_section_block" ADD CONSTRAINT "templates_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_list_block_rows" ADD CONSTRAINT "templates_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_list_block_rows" ADD CONSTRAINT "templates_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_list_block" ADD CONSTRAINT "templates_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "templates_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_tabs_block_tabs" ADD CONSTRAINT "templates_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_tabs_block_tabs" ADD CONSTRAINT "templates_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_tabs_block" ADD CONSTRAINT "templates_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_categories_block_categories" ADD CONSTRAINT "templates_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_blocks_categories_block_categories" ADD CONSTRAINT "templates_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_categories_block" ADD CONSTRAINT "templates_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "templates_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates_blocks_feedback_block" ADD CONSTRAINT "templates_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_hero_block" ADD CONSTRAINT "_templates_v_blocks_hero_block_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_hero_block" ADD CONSTRAINT "_templates_v_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_templates_v_blocks_image_scroller_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_image_scroller_block_rows" ADD CONSTRAINT "_templates_v_blocks_image_scroller_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_image_scroller_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_image_scroller_block" ADD CONSTRAINT "_templates_v_blocks_image_scroller_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_section_block" ADD CONSTRAINT "_templates_v_blocks_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_list_block_rows" ADD CONSTRAINT "_templates_v_blocks_list_block_rows_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_list_block_rows" ADD CONSTRAINT "_templates_v_blocks_list_block_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_list_block" ADD CONSTRAINT "_templates_v_blocks_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_tabs_block_tabs_rows" ADD CONSTRAINT "_templates_v_blocks_tabs_block_tabs_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_tabs_block_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_templates_v_blocks_tabs_block_tabs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_tabs_block_tabs" ADD CONSTRAINT "_templates_v_blocks_tabs_block_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_tabs_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_tabs_block" ADD CONSTRAINT "_templates_v_blocks_tabs_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_categories_block_categories" ADD CONSTRAINT "_templates_v_blocks_categories_block_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_categories_block_categories" ADD CONSTRAINT "_templates_v_blocks_categories_block_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_categories_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_categories_block" ADD CONSTRAINT "_templates_v_blocks_categories_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback_block_form_field_field_options" ADD CONSTRAINT "_templates_v_blocks_feedback_block_form_field_field_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v_blocks_feedback_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v_blocks_feedback_block" ADD CONSTRAINT "_templates_v_blocks_feedback_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_templates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_templates_v" ADD CONSTRAINT "_templates_v_parent_id_templates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_templates_fk" FOREIGN KEY ("templates_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_blocks_header_block_actions" ADD CONSTRAINT "layout_blocks_header_block_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_header_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_blocks_header_block" ADD CONSTRAINT "layout_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_blocks_footer_block_columns_links" ADD CONSTRAINT "layout_blocks_footer_block_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_footer_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_blocks_footer_block_columns" ADD CONSTRAINT "layout_blocks_footer_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_blocks_footer_block" ADD CONSTRAINT "layout_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout_branding_social_media_links" ADD CONSTRAINT "layout_branding_social_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layout" ADD CONSTRAINT "layout_branding_logo_image_id_images_id_fk" FOREIGN KEY ("branding_logo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "layout" ADD CONSTRAINT "layout_branding_favicon_id_images_id_fk" FOREIGN KEY ("branding_favicon_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "layout_locales" ADD CONSTRAINT "layout_locales_meta_image_id_images_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "layout_locales" ADD CONSTRAINT "layout_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_blocks_header_block_actions" ADD CONSTRAINT "_layout_v_blocks_header_block_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v_blocks_header_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_blocks_header_block" ADD CONSTRAINT "_layout_v_blocks_header_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_blocks_footer_block_columns_links" ADD CONSTRAINT "_layout_v_blocks_footer_block_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v_blocks_footer_block_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_blocks_footer_block_columns" ADD CONSTRAINT "_layout_v_blocks_footer_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v_blocks_footer_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_blocks_footer_block" ADD CONSTRAINT "_layout_v_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v_version_branding_social_media_links" ADD CONSTRAINT "_layout_v_version_branding_social_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_layout_v" ADD CONSTRAINT "_layout_v_version_branding_logo_image_id_images_id_fk" FOREIGN KEY ("version_branding_logo_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_layout_v" ADD CONSTRAINT "_layout_v_version_branding_favicon_id_images_id_fk" FOREIGN KEY ("version_branding_favicon_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_layout_v_locales" ADD CONSTRAINT "_layout_v_locales_version_meta_image_id_images_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_layout_v_locales" ADD CONSTRAINT "_layout_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_layout_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_template_block_order_idx" ON "pages_blocks_template_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_template_block_parent_id_idx" ON "pages_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_template_block_path_idx" ON "pages_blocks_template_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_template_block_template_idx" ON "pages_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "pages_blocks_hero_block_order_idx" ON "pages_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_parent_id_idx" ON "pages_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_path_idx" ON "pages_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_block_image_idx" ON "pages_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_scroller_block_rows_order_idx" ON "pages_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_scroller_block_rows_parent_id_idx" ON "pages_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_scroller_block_rows_image_idx" ON "pages_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_scroller_block_order_idx" ON "pages_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_scroller_block_parent_id_idx" ON "pages_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_scroller_block_path_idx" ON "pages_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_block_order_idx" ON "pages_blocks_section_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_block_parent_id_idx" ON "pages_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_block_path_idx" ON "pages_blocks_section_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_block_rows_order_idx" ON "pages_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_block_rows_parent_id_idx" ON "pages_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_block_rows_image_idx" ON "pages_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "pages_blocks_list_block_order_idx" ON "pages_blocks_list_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_block_parent_id_idx" ON "pages_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_block_path_idx" ON "pages_blocks_list_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_tabs_block_tabs_rows_order_idx" ON "pages_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_block_tabs_rows_parent_id_idx" ON "pages_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_block_tabs_order_idx" ON "pages_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_block_tabs_parent_id_idx" ON "pages_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_block_tabs_image_idx" ON "pages_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tabs_block_order_idx" ON "pages_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_block_parent_id_idx" ON "pages_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_block_path_idx" ON "pages_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_categories_block_categories_order_idx" ON "pages_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_categories_block_categories_parent_id_idx" ON "pages_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_categories_block_categories_category_idx" ON "pages_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "pages_blocks_categories_block_order_idx" ON "pages_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_categories_block_parent_id_idx" ON "pages_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_categories_block_path_idx" ON "pages_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_feedback_block_form_field_field_options_order_idx" ON "pages_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "pages_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feedback_block_order_idx" ON "pages_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_feedback_block_parent_id_idx" ON "pages_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feedback_block_path_idx" ON "pages_blocks_feedback_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_template_block_order_idx" ON "_pages_v_blocks_template_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_template_block_parent_id_idx" ON "_pages_v_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_template_block_path_idx" ON "_pages_v_blocks_template_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_template_block_template_idx" ON "_pages_v_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "_pages_v_blocks_hero_block_order_idx" ON "_pages_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_parent_id_idx" ON "_pages_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_block_path_idx" ON "_pages_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_block_image_idx" ON "_pages_v_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_rows_order_idx" ON "_pages_v_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_rows_parent_id_idx" ON "_pages_v_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_rows_image_idx" ON "_pages_v_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_order_idx" ON "_pages_v_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_parent_id_idx" ON "_pages_v_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_scroller_block_path_idx" ON "_pages_v_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_block_order_idx" ON "_pages_v_blocks_section_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_block_parent_id_idx" ON "_pages_v_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_block_path_idx" ON "_pages_v_blocks_section_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_list_block_rows_order_idx" ON "_pages_v_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_block_rows_parent_id_idx" ON "_pages_v_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_block_rows_image_idx" ON "_pages_v_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_list_block_order_idx" ON "_pages_v_blocks_list_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_block_parent_id_idx" ON "_pages_v_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_block_path_idx" ON "_pages_v_blocks_list_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabs_block_tabs_rows_order_idx" ON "_pages_v_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_block_tabs_rows_parent_id_idx" ON "_pages_v_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_block_tabs_order_idx" ON "_pages_v_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_block_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_block_tabs_image_idx" ON "_pages_v_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tabs_block_order_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_block_parent_id_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_block_path_idx" ON "_pages_v_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_categories_block_categories_order_idx" ON "_pages_v_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_categories_block_categories_parent_id_idx" ON "_pages_v_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_categories_block_categories_category_idx" ON "_pages_v_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_categories_block_order_idx" ON "_pages_v_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_categories_block_parent_id_idx" ON "_pages_v_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_categories_block_path_idx" ON "_pages_v_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feedback_block_form_field_field_options_order_idx" ON "_pages_v_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "_pages_v_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_block_order_idx" ON "_pages_v_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feedback_block_parent_id_idx" ON "_pages_v_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feedback_block_path_idx" ON "_pages_v_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_blocks_template_block_order_idx" ON "categories_blocks_template_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_template_block_parent_id_idx" ON "categories_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_template_block_path_idx" ON "categories_blocks_template_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_template_block_template_idx" ON "categories_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "categories_blocks_hero_block_order_idx" ON "categories_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_hero_block_parent_id_idx" ON "categories_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_hero_block_path_idx" ON "categories_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_hero_block_image_idx" ON "categories_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "categories_blocks_image_scroller_block_rows_order_idx" ON "categories_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "categories_blocks_image_scroller_block_rows_parent_id_idx" ON "categories_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_image_scroller_block_rows_image_idx" ON "categories_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "categories_blocks_image_scroller_block_order_idx" ON "categories_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_image_scroller_block_parent_id_idx" ON "categories_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_image_scroller_block_path_idx" ON "categories_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_section_block_order_idx" ON "categories_blocks_section_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_section_block_parent_id_idx" ON "categories_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_section_block_path_idx" ON "categories_blocks_section_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_list_block_rows_order_idx" ON "categories_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "categories_blocks_list_block_rows_parent_id_idx" ON "categories_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_list_block_rows_image_idx" ON "categories_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "categories_blocks_list_block_order_idx" ON "categories_blocks_list_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_list_block_parent_id_idx" ON "categories_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_list_block_path_idx" ON "categories_blocks_list_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_tabs_block_tabs_rows_order_idx" ON "categories_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "categories_blocks_tabs_block_tabs_rows_parent_id_idx" ON "categories_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_tabs_block_tabs_order_idx" ON "categories_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "categories_blocks_tabs_block_tabs_parent_id_idx" ON "categories_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_tabs_block_tabs_image_idx" ON "categories_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "categories_blocks_tabs_block_order_idx" ON "categories_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_tabs_block_parent_id_idx" ON "categories_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_tabs_block_path_idx" ON "categories_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_categories_block_categories_order_idx" ON "categories_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "categories_blocks_categories_block_categories_parent_id_idx" ON "categories_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_categories_block_categories_category_idx" ON "categories_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "categories_blocks_categories_block_order_idx" ON "categories_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_categories_block_parent_id_idx" ON "categories_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_categories_block_path_idx" ON "categories_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_feedback_block_form_field_field_options_order_idx" ON "categories_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "categories_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "categories_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_feedback_block_order_idx" ON "categories_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_feedback_block_parent_id_idx" ON "categories_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_feedback_block_path_idx" ON "categories_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "categories_blocks_products_block_order_idx" ON "categories_blocks_products_block" USING btree ("_order");
  CREATE INDEX "categories_blocks_products_block_parent_id_idx" ON "categories_blocks_products_block" USING btree ("_parent_id");
  CREATE INDEX "categories_blocks_products_block_path_idx" ON "categories_blocks_products_block" USING btree ("_path");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories__status_idx" ON "categories" USING btree ("_status");
  CREATE INDEX "categories_meta_meta_image_idx" ON "categories_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categories_v_blocks_template_block_order_idx" ON "_categories_v_blocks_template_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_template_block_parent_id_idx" ON "_categories_v_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_template_block_path_idx" ON "_categories_v_blocks_template_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_template_block_template_idx" ON "_categories_v_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "_categories_v_blocks_hero_block_order_idx" ON "_categories_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_hero_block_parent_id_idx" ON "_categories_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_hero_block_path_idx" ON "_categories_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_hero_block_image_idx" ON "_categories_v_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_rows_order_idx" ON "_categories_v_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_rows_parent_id_idx" ON "_categories_v_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_rows_image_idx" ON "_categories_v_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_order_idx" ON "_categories_v_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_parent_id_idx" ON "_categories_v_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_image_scroller_block_path_idx" ON "_categories_v_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_section_block_order_idx" ON "_categories_v_blocks_section_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_section_block_parent_id_idx" ON "_categories_v_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_section_block_path_idx" ON "_categories_v_blocks_section_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_list_block_rows_order_idx" ON "_categories_v_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_list_block_rows_parent_id_idx" ON "_categories_v_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_list_block_rows_image_idx" ON "_categories_v_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "_categories_v_blocks_list_block_order_idx" ON "_categories_v_blocks_list_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_list_block_parent_id_idx" ON "_categories_v_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_list_block_path_idx" ON "_categories_v_blocks_list_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_tabs_block_tabs_rows_order_idx" ON "_categories_v_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_tabs_block_tabs_rows_parent_id_idx" ON "_categories_v_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_tabs_block_tabs_order_idx" ON "_categories_v_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_tabs_block_tabs_parent_id_idx" ON "_categories_v_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_tabs_block_tabs_image_idx" ON "_categories_v_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "_categories_v_blocks_tabs_block_order_idx" ON "_categories_v_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_tabs_block_parent_id_idx" ON "_categories_v_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_tabs_block_path_idx" ON "_categories_v_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_categories_block_categories_order_idx" ON "_categories_v_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_categories_block_categories_parent_id_idx" ON "_categories_v_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_categories_block_categories_category_idx" ON "_categories_v_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "_categories_v_blocks_categories_block_order_idx" ON "_categories_v_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_categories_block_parent_id_idx" ON "_categories_v_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_categories_block_path_idx" ON "_categories_v_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_feedback_block_form_field_field_options_order_idx" ON "_categories_v_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "_categories_v_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_feedback_block_order_idx" ON "_categories_v_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_feedback_block_parent_id_idx" ON "_categories_v_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_feedback_block_path_idx" ON "_categories_v_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "_categories_v_blocks_products_block_order_idx" ON "_categories_v_blocks_products_block" USING btree ("_order");
  CREATE INDEX "_categories_v_blocks_products_block_parent_id_idx" ON "_categories_v_blocks_products_block" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_blocks_products_block_path_idx" ON "_categories_v_blocks_products_block" USING btree ("_path");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
  CREATE INDEX "_categories_v_version_version_image_idx" ON "_categories_v" USING btree ("version_image_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_version_version__status_idx" ON "_categories_v" USING btree ("version__status");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_snapshot_idx" ON "_categories_v" USING btree ("snapshot");
  CREATE INDEX "_categories_v_published_locale_idx" ON "_categories_v" USING btree ("published_locale");
  CREATE INDEX "_categories_v_latest_idx" ON "_categories_v" USING btree ("latest");
  CREATE INDEX "_categories_v_autosave_idx" ON "_categories_v" USING btree ("autosave");
  CREATE INDEX "_categories_v_version_meta_version_meta_image_idx" ON "_categories_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_details_rows_order_idx" ON "products_details_rows" USING btree ("_order");
  CREATE INDEX "products_details_rows_parent_id_idx" ON "products_details_rows" USING btree ("_parent_id");
  CREATE INDEX "products_details_order_idx" ON "products_details" USING btree ("_order");
  CREATE INDEX "products_details_parent_id_idx" ON "products_details" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_template_block_order_idx" ON "products_blocks_template_block" USING btree ("_order");
  CREATE INDEX "products_blocks_template_block_parent_id_idx" ON "products_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_template_block_path_idx" ON "products_blocks_template_block" USING btree ("_path");
  CREATE INDEX "products_blocks_template_block_template_idx" ON "products_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "products_blocks_hero_block_order_idx" ON "products_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "products_blocks_hero_block_parent_id_idx" ON "products_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_block_path_idx" ON "products_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "products_blocks_hero_block_image_idx" ON "products_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "products_blocks_image_scroller_block_rows_order_idx" ON "products_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "products_blocks_image_scroller_block_rows_parent_id_idx" ON "products_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_scroller_block_rows_image_idx" ON "products_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "products_blocks_image_scroller_block_order_idx" ON "products_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "products_blocks_image_scroller_block_parent_id_idx" ON "products_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_image_scroller_block_path_idx" ON "products_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "products_blocks_section_block_order_idx" ON "products_blocks_section_block" USING btree ("_order");
  CREATE INDEX "products_blocks_section_block_parent_id_idx" ON "products_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_section_block_path_idx" ON "products_blocks_section_block" USING btree ("_path");
  CREATE INDEX "products_blocks_list_block_rows_order_idx" ON "products_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "products_blocks_list_block_rows_parent_id_idx" ON "products_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_list_block_rows_image_idx" ON "products_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "products_blocks_list_block_order_idx" ON "products_blocks_list_block" USING btree ("_order");
  CREATE INDEX "products_blocks_list_block_parent_id_idx" ON "products_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_list_block_path_idx" ON "products_blocks_list_block" USING btree ("_path");
  CREATE INDEX "products_blocks_tabs_block_tabs_rows_order_idx" ON "products_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "products_blocks_tabs_block_tabs_rows_parent_id_idx" ON "products_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_tabs_block_tabs_order_idx" ON "products_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "products_blocks_tabs_block_tabs_parent_id_idx" ON "products_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_tabs_block_tabs_image_idx" ON "products_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "products_blocks_tabs_block_order_idx" ON "products_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "products_blocks_tabs_block_parent_id_idx" ON "products_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_tabs_block_path_idx" ON "products_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "products_blocks_categories_block_categories_order_idx" ON "products_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "products_blocks_categories_block_categories_parent_id_idx" ON "products_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_categories_block_categories_category_idx" ON "products_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "products_blocks_categories_block_order_idx" ON "products_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "products_blocks_categories_block_parent_id_idx" ON "products_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_categories_block_path_idx" ON "products_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "products_blocks_feedback_block_form_field_field_options_order_idx" ON "products_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "products_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "products_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feedback_block_order_idx" ON "products_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "products_blocks_feedback_block_parent_id_idx" ON "products_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_feedback_block_path_idx" ON "products_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "products__products_products_order_idx" ON "products" USING btree ("_products_products_order");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_image_idx" ON "products" USING btree ("image_id");
  CREATE INDEX "products_categories_idx" ON "products" USING btree ("categories_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_details_rows_order_idx" ON "_products_v_version_details_rows" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_rows_parent_id_idx" ON "_products_v_version_details_rows" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_details_order_idx" ON "_products_v_version_details" USING btree ("_order");
  CREATE INDEX "_products_v_version_details_parent_id_idx" ON "_products_v_version_details" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_template_block_order_idx" ON "_products_v_blocks_template_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_template_block_parent_id_idx" ON "_products_v_blocks_template_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_template_block_path_idx" ON "_products_v_blocks_template_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_template_block_template_idx" ON "_products_v_blocks_template_block" USING btree ("template_id");
  CREATE INDEX "_products_v_blocks_hero_block_order_idx" ON "_products_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_hero_block_parent_id_idx" ON "_products_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_block_path_idx" ON "_products_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_hero_block_image_idx" ON "_products_v_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_image_scroller_block_rows_order_idx" ON "_products_v_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_image_scroller_block_rows_parent_id_idx" ON "_products_v_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_scroller_block_rows_image_idx" ON "_products_v_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_image_scroller_block_order_idx" ON "_products_v_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_image_scroller_block_parent_id_idx" ON "_products_v_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_image_scroller_block_path_idx" ON "_products_v_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_section_block_order_idx" ON "_products_v_blocks_section_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_section_block_parent_id_idx" ON "_products_v_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_section_block_path_idx" ON "_products_v_blocks_section_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_list_block_rows_order_idx" ON "_products_v_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_list_block_rows_parent_id_idx" ON "_products_v_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_list_block_rows_image_idx" ON "_products_v_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_list_block_order_idx" ON "_products_v_blocks_list_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_list_block_parent_id_idx" ON "_products_v_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_list_block_path_idx" ON "_products_v_blocks_list_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_tabs_block_tabs_rows_order_idx" ON "_products_v_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_tabs_block_tabs_rows_parent_id_idx" ON "_products_v_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_tabs_block_tabs_order_idx" ON "_products_v_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_tabs_block_tabs_parent_id_idx" ON "_products_v_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_tabs_block_tabs_image_idx" ON "_products_v_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_tabs_block_order_idx" ON "_products_v_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_tabs_block_parent_id_idx" ON "_products_v_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_tabs_block_path_idx" ON "_products_v_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_categories_block_categories_order_idx" ON "_products_v_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_categories_block_categories_parent_id_idx" ON "_products_v_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_categories_block_categories_category_idx" ON "_products_v_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "_products_v_blocks_categories_block_order_idx" ON "_products_v_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_categories_block_parent_id_idx" ON "_products_v_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_categories_block_path_idx" ON "_products_v_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_feedback_block_form_field_field_options_order_idx" ON "_products_v_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "_products_v_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feedback_block_order_idx" ON "_products_v_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_feedback_block_parent_id_idx" ON "_products_v_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_feedback_block_path_idx" ON "_products_v_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version__products_products_order_idx" ON "_products_v" USING btree ("version__products_products_order");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_image_idx" ON "_products_v" USING btree ("version_image_id");
  CREATE INDEX "_products_v_version_version_categories_idx" ON "_products_v" USING btree ("version_categories_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_blocks_hero_block_order_idx" ON "templates_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_hero_block_parent_id_idx" ON "templates_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_hero_block_path_idx" ON "templates_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_hero_block_image_idx" ON "templates_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "templates_blocks_image_scroller_block_rows_order_idx" ON "templates_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "templates_blocks_image_scroller_block_rows_parent_id_idx" ON "templates_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_image_scroller_block_rows_image_idx" ON "templates_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "templates_blocks_image_scroller_block_order_idx" ON "templates_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_image_scroller_block_parent_id_idx" ON "templates_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_image_scroller_block_path_idx" ON "templates_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_section_block_order_idx" ON "templates_blocks_section_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_section_block_parent_id_idx" ON "templates_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_section_block_path_idx" ON "templates_blocks_section_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_list_block_rows_order_idx" ON "templates_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "templates_blocks_list_block_rows_parent_id_idx" ON "templates_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_list_block_rows_image_idx" ON "templates_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "templates_blocks_list_block_order_idx" ON "templates_blocks_list_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_list_block_parent_id_idx" ON "templates_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_list_block_path_idx" ON "templates_blocks_list_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_tabs_block_tabs_rows_order_idx" ON "templates_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "templates_blocks_tabs_block_tabs_rows_parent_id_idx" ON "templates_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_tabs_block_tabs_order_idx" ON "templates_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "templates_blocks_tabs_block_tabs_parent_id_idx" ON "templates_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_tabs_block_tabs_image_idx" ON "templates_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "templates_blocks_tabs_block_order_idx" ON "templates_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_tabs_block_parent_id_idx" ON "templates_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_tabs_block_path_idx" ON "templates_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_categories_block_categories_order_idx" ON "templates_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "templates_blocks_categories_block_categories_parent_id_idx" ON "templates_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_categories_block_categories_category_idx" ON "templates_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "templates_blocks_categories_block_order_idx" ON "templates_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_categories_block_parent_id_idx" ON "templates_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_categories_block_path_idx" ON "templates_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "templates_blocks_feedback_block_form_field_field_options_order_idx" ON "templates_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "templates_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "templates_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_feedback_block_order_idx" ON "templates_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "templates_blocks_feedback_block_parent_id_idx" ON "templates_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "templates_blocks_feedback_block_path_idx" ON "templates_blocks_feedback_block" USING btree ("_path");
  CREATE UNIQUE INDEX "templates_slug_idx" ON "templates" USING btree ("slug");
  CREATE INDEX "templates_updated_at_idx" ON "templates" USING btree ("updated_at");
  CREATE INDEX "templates_created_at_idx" ON "templates" USING btree ("created_at");
  CREATE INDEX "templates__status_idx" ON "templates" USING btree ("_status");
  CREATE INDEX "_templates_v_blocks_hero_block_order_idx" ON "_templates_v_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_hero_block_parent_id_idx" ON "_templates_v_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_hero_block_path_idx" ON "_templates_v_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_hero_block_image_idx" ON "_templates_v_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_rows_order_idx" ON "_templates_v_blocks_image_scroller_block_rows" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_rows_parent_id_idx" ON "_templates_v_blocks_image_scroller_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_rows_image_idx" ON "_templates_v_blocks_image_scroller_block_rows" USING btree ("image_id");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_order_idx" ON "_templates_v_blocks_image_scroller_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_parent_id_idx" ON "_templates_v_blocks_image_scroller_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_image_scroller_block_path_idx" ON "_templates_v_blocks_image_scroller_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_section_block_order_idx" ON "_templates_v_blocks_section_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_section_block_parent_id_idx" ON "_templates_v_blocks_section_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_section_block_path_idx" ON "_templates_v_blocks_section_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_list_block_rows_order_idx" ON "_templates_v_blocks_list_block_rows" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_list_block_rows_parent_id_idx" ON "_templates_v_blocks_list_block_rows" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_list_block_rows_image_idx" ON "_templates_v_blocks_list_block_rows" USING btree ("image_id");
  CREATE INDEX "_templates_v_blocks_list_block_order_idx" ON "_templates_v_blocks_list_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_list_block_parent_id_idx" ON "_templates_v_blocks_list_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_list_block_path_idx" ON "_templates_v_blocks_list_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_tabs_block_tabs_rows_order_idx" ON "_templates_v_blocks_tabs_block_tabs_rows" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_tabs_block_tabs_rows_parent_id_idx" ON "_templates_v_blocks_tabs_block_tabs_rows" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_tabs_block_tabs_order_idx" ON "_templates_v_blocks_tabs_block_tabs" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_tabs_block_tabs_parent_id_idx" ON "_templates_v_blocks_tabs_block_tabs" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_tabs_block_tabs_image_idx" ON "_templates_v_blocks_tabs_block_tabs" USING btree ("image_id");
  CREATE INDEX "_templates_v_blocks_tabs_block_order_idx" ON "_templates_v_blocks_tabs_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_tabs_block_parent_id_idx" ON "_templates_v_blocks_tabs_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_tabs_block_path_idx" ON "_templates_v_blocks_tabs_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_categories_block_categories_order_idx" ON "_templates_v_blocks_categories_block_categories" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_categories_block_categories_parent_id_idx" ON "_templates_v_blocks_categories_block_categories" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_categories_block_categories_category_idx" ON "_templates_v_blocks_categories_block_categories" USING btree ("category_id");
  CREATE INDEX "_templates_v_blocks_categories_block_order_idx" ON "_templates_v_blocks_categories_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_categories_block_parent_id_idx" ON "_templates_v_blocks_categories_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_categories_block_path_idx" ON "_templates_v_blocks_categories_block" USING btree ("_path");
  CREATE INDEX "_templates_v_blocks_feedback_block_form_field_field_options_order_idx" ON "_templates_v_blocks_feedback_block_form_field_field_options" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_feedback_block_form_field_field_options_parent_id_idx" ON "_templates_v_blocks_feedback_block_form_field_field_options" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_block_order_idx" ON "_templates_v_blocks_feedback_block" USING btree ("_order");
  CREATE INDEX "_templates_v_blocks_feedback_block_parent_id_idx" ON "_templates_v_blocks_feedback_block" USING btree ("_parent_id");
  CREATE INDEX "_templates_v_blocks_feedback_block_path_idx" ON "_templates_v_blocks_feedback_block" USING btree ("_path");
  CREATE INDEX "_templates_v_parent_idx" ON "_templates_v" USING btree ("parent_id");
  CREATE INDEX "_templates_v_version_version_slug_idx" ON "_templates_v" USING btree ("version_slug");
  CREATE INDEX "_templates_v_version_version_updated_at_idx" ON "_templates_v" USING btree ("version_updated_at");
  CREATE INDEX "_templates_v_version_version_created_at_idx" ON "_templates_v" USING btree ("version_created_at");
  CREATE INDEX "_templates_v_version_version__status_idx" ON "_templates_v" USING btree ("version__status");
  CREATE INDEX "_templates_v_created_at_idx" ON "_templates_v" USING btree ("created_at");
  CREATE INDEX "_templates_v_updated_at_idx" ON "_templates_v" USING btree ("updated_at");
  CREATE INDEX "_templates_v_snapshot_idx" ON "_templates_v" USING btree ("snapshot");
  CREATE INDEX "_templates_v_published_locale_idx" ON "_templates_v" USING btree ("published_locale");
  CREATE INDEX "_templates_v_latest_idx" ON "_templates_v" USING btree ("latest");
  CREATE INDEX "_templates_v_autosave_idx" ON "_templates_v" USING btree ("autosave");
  CREATE INDEX "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX "images_filename_idx" ON "images" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("templates_id");
  CREATE INDEX "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "layout_blocks_header_block_actions_order_idx" ON "layout_blocks_header_block_actions" USING btree ("_order");
  CREATE INDEX "layout_blocks_header_block_actions_parent_id_idx" ON "layout_blocks_header_block_actions" USING btree ("_parent_id");
  CREATE INDEX "layout_blocks_header_block_order_idx" ON "layout_blocks_header_block" USING btree ("_order");
  CREATE INDEX "layout_blocks_header_block_parent_id_idx" ON "layout_blocks_header_block" USING btree ("_parent_id");
  CREATE INDEX "layout_blocks_header_block_path_idx" ON "layout_blocks_header_block" USING btree ("_path");
  CREATE INDEX "layout_blocks_footer_block_columns_links_order_idx" ON "layout_blocks_footer_block_columns_links" USING btree ("_order");
  CREATE INDEX "layout_blocks_footer_block_columns_links_parent_id_idx" ON "layout_blocks_footer_block_columns_links" USING btree ("_parent_id");
  CREATE INDEX "layout_blocks_footer_block_columns_order_idx" ON "layout_blocks_footer_block_columns" USING btree ("_order");
  CREATE INDEX "layout_blocks_footer_block_columns_parent_id_idx" ON "layout_blocks_footer_block_columns" USING btree ("_parent_id");
  CREATE INDEX "layout_blocks_footer_block_order_idx" ON "layout_blocks_footer_block" USING btree ("_order");
  CREATE INDEX "layout_blocks_footer_block_parent_id_idx" ON "layout_blocks_footer_block" USING btree ("_parent_id");
  CREATE INDEX "layout_blocks_footer_block_path_idx" ON "layout_blocks_footer_block" USING btree ("_path");
  CREATE INDEX "layout_branding_social_media_links_order_idx" ON "layout_branding_social_media_links" USING btree ("_order");
  CREATE INDEX "layout_branding_social_media_links_parent_id_idx" ON "layout_branding_social_media_links" USING btree ("_parent_id");
  CREATE INDEX "layout_branding_branding_logo_image_idx" ON "layout" USING btree ("branding_logo_image_id");
  CREATE INDEX "layout_branding_branding_favicon_idx" ON "layout" USING btree ("branding_favicon_id");
  CREATE INDEX "layout__status_idx" ON "layout" USING btree ("_status");
  CREATE INDEX "layout_meta_meta_image_idx" ON "layout_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "layout_locales_locale_parent_id_unique" ON "layout_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_layout_v_blocks_header_block_actions_order_idx" ON "_layout_v_blocks_header_block_actions" USING btree ("_order");
  CREATE INDEX "_layout_v_blocks_header_block_actions_parent_id_idx" ON "_layout_v_blocks_header_block_actions" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_blocks_header_block_order_idx" ON "_layout_v_blocks_header_block" USING btree ("_order");
  CREATE INDEX "_layout_v_blocks_header_block_parent_id_idx" ON "_layout_v_blocks_header_block" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_blocks_header_block_path_idx" ON "_layout_v_blocks_header_block" USING btree ("_path");
  CREATE INDEX "_layout_v_blocks_footer_block_columns_links_order_idx" ON "_layout_v_blocks_footer_block_columns_links" USING btree ("_order");
  CREATE INDEX "_layout_v_blocks_footer_block_columns_links_parent_id_idx" ON "_layout_v_blocks_footer_block_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_blocks_footer_block_columns_order_idx" ON "_layout_v_blocks_footer_block_columns" USING btree ("_order");
  CREATE INDEX "_layout_v_blocks_footer_block_columns_parent_id_idx" ON "_layout_v_blocks_footer_block_columns" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_blocks_footer_block_order_idx" ON "_layout_v_blocks_footer_block" USING btree ("_order");
  CREATE INDEX "_layout_v_blocks_footer_block_parent_id_idx" ON "_layout_v_blocks_footer_block" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_blocks_footer_block_path_idx" ON "_layout_v_blocks_footer_block" USING btree ("_path");
  CREATE INDEX "_layout_v_version_branding_social_media_links_order_idx" ON "_layout_v_version_branding_social_media_links" USING btree ("_order");
  CREATE INDEX "_layout_v_version_branding_social_media_links_parent_id_idx" ON "_layout_v_version_branding_social_media_links" USING btree ("_parent_id");
  CREATE INDEX "_layout_v_version_branding_version_branding_logo_image_idx" ON "_layout_v" USING btree ("version_branding_logo_image_id");
  CREATE INDEX "_layout_v_version_branding_version_branding_favicon_idx" ON "_layout_v" USING btree ("version_branding_favicon_id");
  CREATE INDEX "_layout_v_version_version__status_idx" ON "_layout_v" USING btree ("version__status");
  CREATE INDEX "_layout_v_created_at_idx" ON "_layout_v" USING btree ("created_at");
  CREATE INDEX "_layout_v_updated_at_idx" ON "_layout_v" USING btree ("updated_at");
  CREATE INDEX "_layout_v_snapshot_idx" ON "_layout_v" USING btree ("snapshot");
  CREATE INDEX "_layout_v_published_locale_idx" ON "_layout_v" USING btree ("published_locale");
  CREATE INDEX "_layout_v_latest_idx" ON "_layout_v" USING btree ("latest");
  CREATE INDEX "_layout_v_autosave_idx" ON "_layout_v" USING btree ("autosave");
  CREATE INDEX "_layout_v_version_meta_version_meta_image_idx" ON "_layout_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_layout_v_locales_locale_parent_id_unique" ON "_layout_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_template_block" CASCADE;
  DROP TABLE "pages_blocks_hero_block" CASCADE;
  DROP TABLE "pages_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "pages_blocks_image_scroller_block" CASCADE;
  DROP TABLE "pages_blocks_section_block" CASCADE;
  DROP TABLE "pages_blocks_list_block_rows" CASCADE;
  DROP TABLE "pages_blocks_list_block" CASCADE;
  DROP TABLE "pages_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "pages_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs_block" CASCADE;
  DROP TABLE "pages_blocks_categories_block_categories" CASCADE;
  DROP TABLE "pages_blocks_categories_block" CASCADE;
  DROP TABLE "pages_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "pages_blocks_feedback_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_template_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_image_scroller_block" CASCADE;
  DROP TABLE "_pages_v_blocks_section_block" CASCADE;
  DROP TABLE "_pages_v_blocks_list_block_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_list_block" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_block" CASCADE;
  DROP TABLE "_pages_v_blocks_categories_block_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_categories_block" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "_pages_v_blocks_feedback_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "categories_blocks_template_block" CASCADE;
  DROP TABLE "categories_blocks_hero_block" CASCADE;
  DROP TABLE "categories_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "categories_blocks_image_scroller_block" CASCADE;
  DROP TABLE "categories_blocks_section_block" CASCADE;
  DROP TABLE "categories_blocks_list_block_rows" CASCADE;
  DROP TABLE "categories_blocks_list_block" CASCADE;
  DROP TABLE "categories_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "categories_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "categories_blocks_tabs_block" CASCADE;
  DROP TABLE "categories_blocks_categories_block_categories" CASCADE;
  DROP TABLE "categories_blocks_categories_block" CASCADE;
  DROP TABLE "categories_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "categories_blocks_feedback_block" CASCADE;
  DROP TABLE "categories_blocks_products_block" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "_categories_v_blocks_template_block" CASCADE;
  DROP TABLE "_categories_v_blocks_hero_block" CASCADE;
  DROP TABLE "_categories_v_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "_categories_v_blocks_image_scroller_block" CASCADE;
  DROP TABLE "_categories_v_blocks_section_block" CASCADE;
  DROP TABLE "_categories_v_blocks_list_block_rows" CASCADE;
  DROP TABLE "_categories_v_blocks_list_block" CASCADE;
  DROP TABLE "_categories_v_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "_categories_v_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "_categories_v_blocks_tabs_block" CASCADE;
  DROP TABLE "_categories_v_blocks_categories_block_categories" CASCADE;
  DROP TABLE "_categories_v_blocks_categories_block" CASCADE;
  DROP TABLE "_categories_v_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "_categories_v_blocks_feedback_block" CASCADE;
  DROP TABLE "_categories_v_blocks_products_block" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_locales" CASCADE;
  DROP TABLE "products_details_rows" CASCADE;
  DROP TABLE "products_details" CASCADE;
  DROP TABLE "products_blocks_template_block" CASCADE;
  DROP TABLE "products_blocks_hero_block" CASCADE;
  DROP TABLE "products_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "products_blocks_image_scroller_block" CASCADE;
  DROP TABLE "products_blocks_section_block" CASCADE;
  DROP TABLE "products_blocks_list_block_rows" CASCADE;
  DROP TABLE "products_blocks_list_block" CASCADE;
  DROP TABLE "products_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "products_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "products_blocks_tabs_block" CASCADE;
  DROP TABLE "products_blocks_categories_block_categories" CASCADE;
  DROP TABLE "products_blocks_categories_block" CASCADE;
  DROP TABLE "products_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "products_blocks_feedback_block" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "_products_v_version_details_rows" CASCADE;
  DROP TABLE "_products_v_version_details" CASCADE;
  DROP TABLE "_products_v_blocks_template_block" CASCADE;
  DROP TABLE "_products_v_blocks_hero_block" CASCADE;
  DROP TABLE "_products_v_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "_products_v_blocks_image_scroller_block" CASCADE;
  DROP TABLE "_products_v_blocks_section_block" CASCADE;
  DROP TABLE "_products_v_blocks_list_block_rows" CASCADE;
  DROP TABLE "_products_v_blocks_list_block" CASCADE;
  DROP TABLE "_products_v_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "_products_v_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "_products_v_blocks_tabs_block" CASCADE;
  DROP TABLE "_products_v_blocks_categories_block_categories" CASCADE;
  DROP TABLE "_products_v_blocks_categories_block" CASCADE;
  DROP TABLE "_products_v_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "_products_v_blocks_feedback_block" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "templates_blocks_hero_block" CASCADE;
  DROP TABLE "templates_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "templates_blocks_image_scroller_block" CASCADE;
  DROP TABLE "templates_blocks_section_block" CASCADE;
  DROP TABLE "templates_blocks_list_block_rows" CASCADE;
  DROP TABLE "templates_blocks_list_block" CASCADE;
  DROP TABLE "templates_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "templates_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "templates_blocks_tabs_block" CASCADE;
  DROP TABLE "templates_blocks_categories_block_categories" CASCADE;
  DROP TABLE "templates_blocks_categories_block" CASCADE;
  DROP TABLE "templates_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "templates_blocks_feedback_block" CASCADE;
  DROP TABLE "templates" CASCADE;
  DROP TABLE "_templates_v_blocks_hero_block" CASCADE;
  DROP TABLE "_templates_v_blocks_image_scroller_block_rows" CASCADE;
  DROP TABLE "_templates_v_blocks_image_scroller_block" CASCADE;
  DROP TABLE "_templates_v_blocks_section_block" CASCADE;
  DROP TABLE "_templates_v_blocks_list_block_rows" CASCADE;
  DROP TABLE "_templates_v_blocks_list_block" CASCADE;
  DROP TABLE "_templates_v_blocks_tabs_block_tabs_rows" CASCADE;
  DROP TABLE "_templates_v_blocks_tabs_block_tabs" CASCADE;
  DROP TABLE "_templates_v_blocks_tabs_block" CASCADE;
  DROP TABLE "_templates_v_blocks_categories_block_categories" CASCADE;
  DROP TABLE "_templates_v_blocks_categories_block" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback_block_form_field_field_options" CASCADE;
  DROP TABLE "_templates_v_blocks_feedback_block" CASCADE;
  DROP TABLE "_templates_v" CASCADE;
  DROP TABLE "images" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "layout_blocks_header_block_actions" CASCADE;
  DROP TABLE "layout_blocks_header_block" CASCADE;
  DROP TABLE "layout_blocks_footer_block_columns_links" CASCADE;
  DROP TABLE "layout_blocks_footer_block_columns" CASCADE;
  DROP TABLE "layout_blocks_footer_block" CASCADE;
  DROP TABLE "layout_branding_social_media_links" CASCADE;
  DROP TABLE "layout" CASCADE;
  DROP TABLE "layout_locales" CASCADE;
  DROP TABLE "_layout_v_blocks_header_block_actions" CASCADE;
  DROP TABLE "_layout_v_blocks_header_block" CASCADE;
  DROP TABLE "_layout_v_blocks_footer_block_columns_links" CASCADE;
  DROP TABLE "_layout_v_blocks_footer_block_columns" CASCADE;
  DROP TABLE "_layout_v_blocks_footer_block" CASCADE;
  DROP TABLE "_layout_v_version_branding_social_media_links" CASCADE;
  DROP TABLE "_layout_v" CASCADE;
  DROP TABLE "_layout_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."action_type";
  DROP TYPE "public"."icon_position";
  DROP TYPE "public"."link_color";
  DROP TYPE "public"."link_variant";
  DROP TYPE "public"."btn_color";
  DROP TYPE "public"."btn_variant";
  DROP TYPE "public"."content_align";
  DROP TYPE "public"."text_align";
  DROP TYPE "public"."card_block_type";
  DROP TYPE "public"."field_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."include_products";
  DROP TYPE "public"."enum_categories_status";
  DROP TYPE "public"."enum__categories_v_version_status";
  DROP TYPE "public"."enum__categories_v_published_locale";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_templates_status";
  DROP TYPE "public"."enum__templates_v_version_status";
  DROP TYPE "public"."enum__templates_v_published_locale";
  DROP TYPE "public"."role";
  DROP TYPE "public"."social_platform";
  DROP TYPE "public"."enum_layout_status";
  DROP TYPE "public"."enum__layout_v_version_status";
  DROP TYPE "public"."enum__layout_v_published_locale";`)
}
