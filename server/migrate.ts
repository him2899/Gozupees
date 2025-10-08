/**
 * Database migration script
 * This script creates the database tables based on our schema
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '../shared/schema';

async function runMigration() {
  console.log('Starting database migration...');
  
  try {
    // Get the database connection string from environment variables
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    
    // Create a Postgres client for migration
    const migrationClient = postgres(connectionString, { max: 1 });
    
    // Create a Drizzle instance
    const db = drizzle(migrationClient);
    
    // Run the migration
    console.log('Creating database tables...');
    
    // Create tables in the correct order to handle foreign key dependencies
    await db.execute(/* sql */`
      -- Create users table
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL
      );
      
      -- Create wp_categories table
      CREATE TABLE IF NOT EXISTS "wp_categories" (
        "id" INTEGER PRIMARY KEY,
        "count" INTEGER NOT NULL DEFAULT 0,
        "description" TEXT,
        "link" TEXT,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL UNIQUE,
        "taxonomy" TEXT NOT NULL DEFAULT 'category',
        "parent" INTEGER DEFAULT 0,
        "meta" JSONB,
        "last_synced" TIMESTAMP DEFAULT NOW()
      );
      
      -- Create wp_tags table
      CREATE TABLE IF NOT EXISTS "wp_tags" (
        "id" INTEGER PRIMARY KEY,
        "count" INTEGER NOT NULL DEFAULT 0,
        "description" TEXT,
        "link" TEXT,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL UNIQUE,
        "taxonomy" TEXT NOT NULL DEFAULT 'post_tag',
        "meta" JSONB,
        "last_synced" TIMESTAMP DEFAULT NOW()
      );
      
      -- Create wp_authors table
      CREATE TABLE IF NOT EXISTS "wp_authors" (
        "id" INTEGER PRIMARY KEY,
        "name" TEXT NOT NULL,
        "url" TEXT,
        "description" TEXT,
        "link" TEXT,
        "slug" TEXT NOT NULL,
        "avatar_urls" JSONB,
        "last_synced" TIMESTAMP DEFAULT NOW()
      );
      
      -- Create wp_media table
      CREATE TABLE IF NOT EXISTS "wp_media" (
        "id" INTEGER PRIMARY KEY,
        "date" TIMESTAMP NOT NULL,
        "date_gmt" TIMESTAMP,
        "modified" TIMESTAMP,
        "modified_gmt" TIMESTAMP,
        "slug" TEXT NOT NULL,
        "status" TEXT,
        "type" TEXT NOT NULL,
        "link" TEXT,
        "title_rendered" TEXT,
        "source_url" TEXT NOT NULL,
        "alt_text" TEXT,
        "media_type" TEXT,
        "mime_type" TEXT,
        "media_details" JSONB,
        "last_synced" TIMESTAMP DEFAULT NOW()
      );
      
      -- Create wp_posts table
      CREATE TABLE IF NOT EXISTS "wp_posts" (
        "id" INTEGER PRIMARY KEY,
        "date" TIMESTAMP NOT NULL,
        "date_gmt" TIMESTAMP NOT NULL,
        "modified" TIMESTAMP NOT NULL,
        "modified_gmt" TIMESTAMP NOT NULL,
        "slug" TEXT NOT NULL UNIQUE,
        "status" TEXT NOT NULL DEFAULT 'publish',
        "type" TEXT NOT NULL DEFAULT 'post',
        "link" TEXT,
        "title_rendered" TEXT NOT NULL,
        "content_rendered" TEXT NOT NULL,
        "excerpt_rendered" TEXT,
        "featured_media" INTEGER,
        "comment_status" TEXT,
        "ping_status" TEXT,
        "format" TEXT,
        "meta" JSONB,
        "sticky" BOOLEAN DEFAULT FALSE,
        "template" TEXT,
        "categories" INTEGER[],
        "tags" INTEGER[],
        "acf" JSONB,
        "featured_media_url" TEXT,
        "featured_media_alt" TEXT,
        "author_id" INTEGER,
        "author_name" TEXT,
        "author_avatar" TEXT,
        "last_synced" TIMESTAMP DEFAULT NOW()
      );
      
      -- Create sync_status table
      CREATE TABLE IF NOT EXISTS "sync_status" (
        "id" SERIAL PRIMARY KEY,
        "entity_type" TEXT NOT NULL,
        "last_synced" TIMESTAMP DEFAULT NOW(),
        "status" TEXT NOT NULL,
        "total_synced" INTEGER DEFAULT 0,
        "error_message" TEXT,
        "created_at" TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Database migration completed successfully');
    
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

// Run the migration
runMigration();