CREATE TABLE "ai_agent_use_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"industry" text NOT NULL,
	"use_case" text NOT NULL,
	"tab" text NOT NULL,
	"mini_tags" text[] NOT NULL,
	"icon" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "demos" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"use_case_name" text NOT NULL,
	"industry" text NOT NULL,
	"language" text NOT NULL,
	"function" text NOT NULL,
	"country" text NOT NULL,
	"audio_url" text NOT NULL,
	"avatar_url" text,
	"transcript" text,
	"duration" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "features" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"use_case" text NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"source" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"company" text,
	"agent_name" text,
	"agent_function" text
);

CREATE TABLE "newsletter_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"newsletter_id" text NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "newsletter_images_newsletter_id_unique" UNIQUE("newsletter_id")
);

CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"ai_revops" boolean DEFAULT false,
	"masters_of_dtc" boolean DEFAULT false,
	"monthly_digest" boolean DEFAULT false,
	"subscribed_at" timestamp DEFAULT now(),
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);

CREATE TABLE "solution_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"solution_slug" text NOT NULL,
	"position" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE "sync_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"entity_type" text NOT NULL,
	"last_synced" timestamp DEFAULT now(),
	"status" text NOT NULL,
	"total_synced" integer DEFAULT 0,
	"error_message" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" text NOT NULL,
	"company" text NOT NULL,
	"position" text NOT NULL,
	"testimonial" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"industry" text NOT NULL,
	"use_case" text NOT NULL,
	"avatar_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
