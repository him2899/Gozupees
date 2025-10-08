import { 
  users, type User, type InsertUser,
  wp_posts, type WPPost, type InsertWPPost,
  wp_categories, type WPCategory, type InsertWPCategory,
  wp_tags, type WPTag, type InsertWPTag,
  wp_media, type WPMedia, type InsertWPMedia,
  wp_authors, type WPAuthor, type InsertWPAuthor,
  sync_status, type SyncStatus, type InsertSyncStatus,
  demos, type Demo, type InsertDemo
} from "@shared/schema";
import { and, eq, gte, inArray, like, sql } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // WordPress post methods
  getPosts(page?: number, perPage?: number, categories?: number[]): Promise<{posts: WPPost[], totalPosts: number, totalPages: number}>;
  getPostBySlug(slug: string): Promise<WPPost | undefined>;
  getPostById(id: number): Promise<WPPost | undefined>;
  createOrUpdatePost(post: InsertWPPost): Promise<WPPost>;
  
  // WordPress category methods
  getCategories(): Promise<WPCategory[]>;
  getCategoryBySlug(slug: string): Promise<WPCategory | undefined>;
  getCategoryById(id: number): Promise<WPCategory | undefined>;
  createOrUpdateCategory(category: InsertWPCategory): Promise<WPCategory>;
  
  // WordPress tag methods
  getTags(): Promise<WPTag[]>;
  getTagBySlug(slug: string): Promise<WPTag | undefined>;
  getTagById(id: number): Promise<WPTag | undefined>;
  createOrUpdateTag(tag: InsertWPTag): Promise<WPTag>;
  
  // WordPress media methods
  getMediaById(id: number): Promise<WPMedia | undefined>;
  createOrUpdateMedia(media: InsertWPMedia): Promise<WPMedia>;
  
  // WordPress author methods
  getAuthorById(id: number): Promise<WPAuthor | undefined>;
  createOrUpdateAuthor(author: InsertWPAuthor): Promise<WPAuthor>;
  
  // Sync status methods
  logSyncStatus(status: InsertSyncStatus): Promise<SyncStatus>;
  getLastSyncStatus(entityType: string): Promise<SyncStatus | undefined>;
  
  // Demo methods
  getDemos(): Promise<Demo[]>;
  getDemoById(id: number): Promise<Demo | undefined>;
  createOrUpdateDemo(demo: InsertDemo): Promise<Demo>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // WordPress post methods - Memory storage implementation
  async getPosts(page: number = 1, perPage: number = 10, categories?: number[]): Promise<{posts: WPPost[], totalPosts: number, totalPages: number}> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getPostBySlug(slug: string): Promise<WPPost | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getPostById(id: number): Promise<WPPost | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async createOrUpdatePost(post: InsertWPPost): Promise<WPPost> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // WordPress category methods
  async getCategories(): Promise<WPCategory[]> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getCategoryBySlug(slug: string): Promise<WPCategory | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getCategoryById(id: number): Promise<WPCategory | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async createOrUpdateCategory(category: InsertWPCategory): Promise<WPCategory> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // WordPress tag methods
  async getTags(): Promise<WPTag[]> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getTagBySlug(slug: string): Promise<WPTag | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getTagById(id: number): Promise<WPTag | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async createOrUpdateTag(tag: InsertWPTag): Promise<WPTag> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // WordPress media methods
  async getMediaById(id: number): Promise<WPMedia | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async createOrUpdateMedia(media: InsertWPMedia): Promise<WPMedia> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // WordPress author methods
  async getAuthorById(id: number): Promise<WPAuthor | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async createOrUpdateAuthor(author: InsertWPAuthor): Promise<WPAuthor> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // Sync status methods
  async logSyncStatus(status: InsertSyncStatus): Promise<SyncStatus> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  async getLastSyncStatus(entityType: string): Promise<SyncStatus | undefined> {
    throw new Error("MemStorage doesn't implement WordPress methods. Use DbStorage instead.");
  }
  
  // Demo methods
  async getDemos(): Promise<Demo[]> {
    throw new Error("MemStorage doesn't implement Demo methods. Use DbStorage instead.");
  }
  
  async getDemoById(id: number): Promise<Demo | undefined> {
    throw new Error("MemStorage doesn't implement Demo methods. Use DbStorage instead.");
  }
  
  async createOrUpdateDemo(demo: InsertDemo): Promise<Demo> {
    throw new Error("MemStorage doesn't implement Demo methods. Use DbStorage instead.");
  }
}

// Database storage implementation for WordPress data
export class DbStorage implements IStorage {
  private db: PostgresJsDatabase;
  private memStorage = new MemStorage(); // For user management, we'll keep using the memory storage
  
  constructor() {
    // Setup the database connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    // Create a Postgres client
    const client = postgres(connectionString, { max: 10 });
    
    // Create a Drizzle ORM instance
    this.db = drizzle(client);
    
    console.log("Database connection established");
  }
  
  // User methods - delegate to memory storage
  async getUser(id: number): Promise<User | undefined> {
    return this.memStorage.getUser(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.memStorage.getUserByUsername(username);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    return this.memStorage.createUser(insertUser);
  }
  
  // WordPress post methods
  async getPosts(page: number = 1, perPage: number = 10, categories?: number[]): Promise<{posts: WPPost[], totalPosts: number, totalPages: number}> {
    try {
      // Calculate offset for pagination
      const offset = (page - 1) * perPage;
      
      // Base query
      let query = this.db.select().from(wp_posts)
        .where(eq(wp_posts.status, "publish"))
        .orderBy(sql`${wp_posts.date} DESC`);
      
      // Apply category filter if provided
      if (categories && categories.length > 0) {
        // For simplicity, we'll only filter by the first category
        // In a more complex scenario, we'd need a different approach for array contains
        const firstCategoryId = categories[0];
        // Use a more straightforward condition
        query = (query as any).where(sql`${wp_posts.categories} && ARRAY[${firstCategoryId}]::integer[]`);
      }
      
      // Get total count for pagination
      const countResult = await this.db.select({ 
        count: sql<number>`count(*)` 
      })
      .from(wp_posts)
      .where(eq(wp_posts.status, "publish"))
      .execute();
      
      const totalPosts = Number(countResult[0]?.count || 0);
      const totalPages = Math.ceil(totalPosts / perPage);
      
      // Apply pagination and get results
      const posts = await query
        .limit(perPage)
        .offset(offset)
        .execute();
      
      return { posts, totalPosts, totalPages };
    } catch (error) {
      console.error("Error fetching posts from database:", error);
      throw error;
    }
  }
  
  async getPostBySlug(slug: string): Promise<WPPost | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_posts)
        .where(eq(wp_posts.slug, slug))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching post with slug ${slug} from database:`, error);
      throw error;
    }
  }
  
  async getPostById(id: number): Promise<WPPost | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_posts)
        .where(eq(wp_posts.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching post with id ${id} from database:`, error);
      throw error;
    }
  }
  
  async createOrUpdatePost(post: InsertWPPost): Promise<WPPost> {
    try {
      // Check if post already exists
      const existingPost = await this.getPostById(post.id);
      
      if (existingPost) {
        // Update existing post
        const now = new Date();
        await this.db.update(wp_posts)
          .set({ ...post, last_synced: now })
          .where(eq(wp_posts.id, post.id))
          .execute();
        
        // Return the updated post
        const updatedPost = await this.getPostById(post.id);
        if (!updatedPost) {
          throw new Error(`Failed to fetch updated post with ID ${post.id}`);
        }
        return updatedPost;
      } else {
        // Insert new post
        await this.db.insert(wp_posts)
          .values(post)
          .execute();
        
        // Return the new post
        const newPost = await this.getPostById(post.id);
        if (!newPost) {
          throw new Error(`Failed to fetch new post with ID ${post.id}`);
        }
        return newPost;
      }
    } catch (error) {
      console.error(`Error creating/updating post with id ${post.id}:`, error);
      throw error;
    }
  }
  
  // WordPress category methods
  async getCategories(): Promise<WPCategory[]> {
    try {
      return await this.db.select()
        .from(wp_categories)
        .orderBy(sql`${wp_categories.name}`)
        .execute();
    } catch (error) {
      console.error("Error fetching categories from database:", error);
      throw error;
    }
  }
  
  async getCategoryBySlug(slug: string): Promise<WPCategory | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_categories)
        .where(eq(wp_categories.slug, slug))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching category with slug ${slug} from database:`, error);
      throw error;
    }
  }
  
  async getCategoryById(id: number): Promise<WPCategory | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_categories)
        .where(eq(wp_categories.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching category with id ${id} from database:`, error);
      throw error;
    }
  }
  
  async createOrUpdateCategory(category: InsertWPCategory): Promise<WPCategory> {
    try {
      // Check if category already exists
      const existingCategory = await this.getCategoryById(category.id);
      
      if (existingCategory) {
        // Update existing category
        const now = new Date();
        await this.db.update(wp_categories)
          .set({ ...category, last_synced: now })
          .where(eq(wp_categories.id, category.id))
          .execute();
        
        // Return the updated category
        const updatedCategory = await this.getCategoryById(category.id);
        if (!updatedCategory) {
          throw new Error(`Failed to fetch updated category with ID ${category.id}`);
        }
        return updatedCategory;
      } else {
        // Insert new category
        await this.db.insert(wp_categories)
          .values(category)
          .execute();
        
        // Return the new category
        const newCategory = await this.getCategoryById(category.id);
        if (!newCategory) {
          throw new Error(`Failed to fetch new category with ID ${category.id}`);
        }
        return newCategory;
      }
    } catch (error) {
      console.error(`Error creating/updating category with id ${category.id}:`, error);
      throw error;
    }
  }
  
  // WordPress tag methods
  async getTags(): Promise<WPTag[]> {
    try {
      return await this.db.select()
        .from(wp_tags)
        .orderBy(sql`${wp_tags.name}`)
        .execute();
    } catch (error) {
      console.error("Error fetching tags from database:", error);
      throw error;
    }
  }
  
  async getTagBySlug(slug: string): Promise<WPTag | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_tags)
        .where(eq(wp_tags.slug, slug))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching tag with slug ${slug} from database:`, error);
      throw error;
    }
  }
  
  async getTagById(id: number): Promise<WPTag | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_tags)
        .where(eq(wp_tags.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching tag with id ${id} from database:`, error);
      throw error;
    }
  }
  
  async createOrUpdateTag(tag: InsertWPTag): Promise<WPTag> {
    try {
      // Check if tag already exists
      const existingTag = await this.getTagById(tag.id);
      
      if (existingTag) {
        // Update existing tag
        const now = new Date();
        await this.db.update(wp_tags)
          .set({ ...tag, last_synced: now })
          .where(eq(wp_tags.id, tag.id))
          .execute();
        
        // Return the updated tag
        const updatedTag = await this.getTagById(tag.id);
        if (!updatedTag) {
          throw new Error(`Failed to fetch updated tag with ID ${tag.id}`);
        }
        return updatedTag;
      } else {
        // Insert new tag
        await this.db.insert(wp_tags)
          .values(tag)
          .execute();
        
        // Return the new tag
        const newTag = await this.getTagById(tag.id);
        if (!newTag) {
          throw new Error(`Failed to fetch new tag with ID ${tag.id}`);
        }
        return newTag;
      }
    } catch (error) {
      console.error(`Error creating/updating tag with id ${tag.id}:`, error);
      throw error;
    }
  }
  
  // WordPress media methods
  async getMediaById(id: number): Promise<WPMedia | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_media)
        .where(eq(wp_media.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching media with id ${id} from database:`, error);
      return undefined; // Return undefined instead of throwing to allow sync to continue
    }
  }
  
  async createOrUpdateMedia(media: InsertWPMedia): Promise<WPMedia | undefined> {
    try {
      // Check if media already exists
      const existingMedia = await this.getMediaById(media.id);
      
      if (existingMedia) {
        // Update existing media
        const now = new Date();
        await this.db.update(wp_media)
          .set({ ...media, last_synced: now })
          .where(eq(wp_media.id, media.id))
          .execute();
        
        // Return the updated media
        return await this.getMediaById(media.id);
      } else {
        // Insert new media
        await this.db.insert(wp_media)
          .values(media)
          .execute();
        
        // Return the new media
        return await this.getMediaById(media.id);
      }
    } catch (error) {
      console.error(`Error creating/updating media with id ${media.id}:`, error);
      return undefined; // Return undefined instead of throwing to allow sync to continue
    }
  }
  
  // WordPress author methods
  async getAuthorById(id: number): Promise<WPAuthor | undefined> {
    try {
      const results = await this.db.select()
        .from(wp_authors)
        .where(eq(wp_authors.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching author with id ${id} from database:`, error);
      throw error;
    }
  }
  
  async createOrUpdateAuthor(author: InsertWPAuthor): Promise<WPAuthor> {
    try {
      // Check if author already exists
      const existingAuthor = await this.getAuthorById(author.id);
      
      if (existingAuthor) {
        // Update existing author
        const now = new Date();
        await this.db.update(wp_authors)
          .set({ ...author, last_synced: now })
          .where(eq(wp_authors.id, author.id))
          .execute();
        
        // Return the updated author
        const updatedAuthor = await this.getAuthorById(author.id);
        if (!updatedAuthor) {
          throw new Error(`Failed to fetch updated author with ID ${author.id}`);
        }
        return updatedAuthor;
      } else {
        // Insert new author
        await this.db.insert(wp_authors)
          .values(author)
          .execute();
        
        // Return the new author
        const newAuthor = await this.getAuthorById(author.id);
        if (!newAuthor) {
          throw new Error(`Failed to fetch new author with ID ${author.id}`);
        }
        return newAuthor;
      }
    } catch (error) {
      console.error(`Error creating/updating author with id ${author.id}:`, error);
      throw error;
    }
  }
  
  // Sync status methods
  async logSyncStatus(status: InsertSyncStatus): Promise<SyncStatus> {
    try {
      const [result] = await this.db.insert(sync_status)
        .values(status)
        .returning()
        .execute();
      
      return result;
    } catch (error) {
      console.error(`Error logging sync status for ${status.entity_type}:`, error);
      throw error;
    }
  }
  
  async getLastSyncStatus(entityType: string): Promise<SyncStatus | undefined> {
    try {
      const results = await this.db.select()
        .from(sync_status)
        .where(eq(sync_status.entity_type, entityType))
        .orderBy(sql`${sync_status.last_synced} DESC`)
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching last sync status for ${entityType}:`, error);
      throw error;
    }
  }
  
  // Demo methods
  async getDemos(): Promise<Demo[]> {
    try {
      return await this.db.select()
        .from(demos)
        .orderBy(sql`${demos.createdAt} DESC`)
        .execute();
    } catch (error) {
      console.error("Error fetching demos from database:", error);
      throw error;
    }
  }
  
  async getDemoById(id: number): Promise<Demo | undefined> {
    try {
      const results = await this.db.select()
        .from(demos)
        .where(eq(demos.id, id))
        .limit(1)
        .execute();
      
      return results[0];
    } catch (error) {
      console.error(`Error fetching demo with id ${id} from database:`, error);
      throw error;
    }
  }
  
  async createOrUpdateDemo(demo: InsertDemo): Promise<Demo> {
    try {
      if ('id' in demo && demo.id) {
        // Update existing demo
        await this.db.update(demos)
          .set(demo as any)
          .where(eq(demos.id, (demo as any).id))
          .execute();
        
        const updatedDemo = await this.getDemoById((demo as any).id);
        if (!updatedDemo) {
          throw new Error(`Failed to fetch updated demo with ID ${(demo as any).id}`);
        }
        return updatedDemo;
      } else {
        // Insert new demo
        const [result] = await this.db.insert(demos)
          .values(demo)
          .returning()
          .execute();
        
        return result;
      }
    } catch (error) {
      console.error(`Error creating/updating demo:`, error);
      throw error;
    }
  }
}

// Create and export the appropriate storage implementation
export const storage = new DbStorage();
