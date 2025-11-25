CREATE TABLE "embeddings" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1536),
	"metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"message" text,
	"project_type" text,
	"timing" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"content" text,
	"cover_image" text,
	"published_at" timestamp DEFAULT now(),
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "references" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"location" text,
	"client_type" text,
	"description" text,
	"category" text,
	"images" json,
	CONSTRAINT "references_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "embeddingIndex" ON "embeddings" USING hnsw ("embedding" vector_cosine_ops);