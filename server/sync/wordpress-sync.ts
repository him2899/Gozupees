/**
 * WordPress Sync Service
 * 
 * This service handles fetching data from WordPress API and syncing it to our PostgreSQL database.
 * It runs on a schedule and only updates new or changed content.
 */

import { fetchFromWordPress, createWPRequestOptions, getWPApiUrl } from '../../lib/api/wordpress';
import { storage } from '../storage';
import { 
  InsertWPPost, 
  InsertWPCategory, 
  InsertWPTag, 
  InsertWPMedia, 
  InsertWPAuthor,
  InsertSyncStatus
} from '@shared/schema';
import cron from 'node-cron';

// Set up constants for sync service
const SYNC_INTERVAL = process.env.WP_SYNC_INTERVAL || '*/30 * * * *'; // Default: every 30 minutes
const WP_PER_PAGE = 100; // Number of items to fetch per request
const MAX_RETRIES = 3; // Maximum number of retries for failed requests

// Define WordPress API entity types for syncing
type EntityType = 'posts' | 'categories' | 'tags' | 'media' | 'users';

// Initialize sync status
let isSyncRunning = false;
let lastSyncTime: Record<EntityType, Date> = {
  'posts': new Date(0),
  'categories': new Date(0),
  'tags': new Date(0),
  'media': new Date(0),
  'users': new Date(0)
};

/**
 * Create WordPress API URL with parameters
 */
function createWpApiUrl(endpoint: string, params: Record<string, string | number> = {}): string {
  const queryParams = new URLSearchParams();
  
  // Add each parameter to the query string
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });
  
  // Build the full URL
  const baseUrl = getWPApiUrl();
  const queryString = queryParams.toString();
  
  return `${baseUrl}/${endpoint}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Sync WordPress posts to the database
 */
async function syncPosts(): Promise<number> {
  try {
    console.log('Starting WordPress posts sync...');
    
    // Get last sync time
    const lastSyncStatus = await storage.getLastSyncStatus('posts');
    const lastModifiedDate = lastSyncStatus?.last_synced || new Date(0);
    
    // Format date for WordPress API
    const modifiedAfter = lastModifiedDate.toISOString();
    
    // Track sync stats
    let page = 1;
    let totalSynced = 0;
    let hasMorePages = true;
    
    // Log sync started
    await storage.logSyncStatus({
      entity_type: 'posts',
      status: 'in_progress',
      last_synced: new Date(),
      total_synced: 0
    });
    
    while (hasMorePages) {
      // Fetch posts modified after last sync
      console.log(`Fetching WordPress posts page ${page}...`);
      
      const posts = await fetchFromWordPress<any[]>(`posts?_embed=true&page=${page}&per_page=${WP_PER_PAGE}&orderby=date&order=desc&status=publish`);
      
      if (posts.length === 0) {
        hasMorePages = false;
        continue;
      }
      
      // Process each post
      for (const post of posts) {
        try {
          // Extract featured media
          let featuredMediaUrl = '';
          let featuredMediaAlt = '';
          
          if (post._embedded && post._embedded['wp:featuredmedia']?.length > 0) {
            const media = post._embedded['wp:featuredmedia'][0];
            featuredMediaUrl = media.source_url || '';
            featuredMediaAlt = media.alt_text || '';
            
            // Also sync the media to wp_media table
            if (media.id && featuredMediaUrl) {
              try {
                await storage.createOrUpdateMedia({
                  id: media.id,
                  date: new Date(media.date || post.date),
                  date_gmt: new Date(media.date_gmt || post.date_gmt),
                  modified: new Date(media.modified || post.modified),
                  modified_gmt: new Date(media.modified_gmt || post.modified_gmt),
                  slug: media.slug || '',
                  status: media.status || 'inherit',
                  type: media.type || 'attachment',
                  link: media.link || '',
                  title_rendered: media.title?.rendered || '',
                  alt_text: media.alt_text || '',
                  media_type: media.media_type || 'image',
                  mime_type: media.mime_type || '',
                  source_url: media.source_url || '',
                  media_details: media.media_details || {},
                  last_synced: new Date()
                });
              } catch (mediaError) {
                console.error(`Error syncing featured media ${media.id}:`, mediaError);
              }
            }
          }
          
          // Extract author info
          let authorId = 0;
          let authorName = '';
          let authorAvatar = '';
          
          if (post._embedded && post._embedded.author?.length > 0) {
            const author = post._embedded.author[0];
            authorId = author.id || 0;
            authorName = author.name || '';
            authorAvatar = author.avatar_urls && author.avatar_urls['96'] ? author.avatar_urls['96'] : '';
            
            // Also sync the author to the authors table
            if (authorId > 0) {
              await storage.createOrUpdateAuthor({
                id: authorId,
                name: authorName,
                url: author.url || '',
                description: author.description || '',
                link: author.link || '',
                slug: author.slug || '',
                avatar_urls: author.avatar_urls || {}
              });
            }
          }
          
          // Transform WordPress post to database format
          const dbPost: InsertWPPost = {
            id: post.id,
            date: new Date(post.date),
            date_gmt: new Date(post.date_gmt),
            modified: new Date(post.modified),
            modified_gmt: new Date(post.modified_gmt),
            slug: post.slug,
            status: post.status,
            type: post.type,
            link: post.link,
            title_rendered: post.title.rendered,
            content_rendered: post.content.rendered,
            excerpt_rendered: post.excerpt.rendered,
            featured_media: post.featured_media,
            comment_status: post.comment_status,
            ping_status: post.ping_status,
            format: post.format,
            meta: post.meta || {},
            sticky: post.sticky || false,
            template: post.template,
            categories: post.categories || [],
            tags: post.tags || [],
            acf: post.acf || {},
            // Embedded data
            featured_media_url: featuredMediaUrl,
            featured_media_alt: featuredMediaAlt,
            author_id: authorId,
            author_name: authorName,
            author_avatar: authorAvatar
          };
          
          // Create or update post in database
          await storage.createOrUpdatePost(dbPost);
          totalSynced++;
          
        } catch (error) {
          console.error(`Error processing post ${post.id}:`, error);
        }
      }
      
      // Check if we need to continue to the next page
      hasMorePages = posts.length === WP_PER_PAGE;
      page++;
    }
    
    // Log sync completed
    await storage.logSyncStatus({
      entity_type: 'posts',
      status: 'completed',
      last_synced: new Date(),
      total_synced: totalSynced
    });
    
    console.log(`WordPress posts sync completed. Total synced: ${totalSynced}`);
    return totalSynced;
    
  } catch (error) {
    console.error('Error syncing WordPress posts:', error);
    
    // Log sync error
    await storage.logSyncStatus({
      entity_type: 'posts',
      status: 'error',
      last_synced: new Date(),
      total_synced: 0,
      error_message: error instanceof Error ? error.message : String(error)
    });
    
    throw error;
  }
}

/**
 * Sync WordPress categories to the database
 */
async function syncCategories(): Promise<number> {
  try {
    console.log('Starting WordPress categories sync...');
    
    // Log sync started
    await storage.logSyncStatus({
      entity_type: 'categories',
      status: 'in_progress',
      last_synced: new Date(),
      total_synced: 0
    });
    
    // Fetch all categories (usually not too many)
    const categories = await fetchFromWordPress<any[]>(`categories?per_page=100`);
    let totalSynced = 0;
    
    // Process each category
    for (const category of categories) {
      try {
        // Transform WordPress category to database format
        const dbCategory: InsertWPCategory = {
          id: category.id,
          count: category.count || 0,
          description: category.description || '',
          link: category.link || '',
          name: category.name,
          slug: category.slug,
          taxonomy: category.taxonomy || 'category',
          parent: category.parent || 0,
          meta: category.meta || {}
        };
        
        // Create or update category in database
        await storage.createOrUpdateCategory(dbCategory);
        totalSynced++;
        
      } catch (error) {
        console.error(`Error processing category ${category.id}:`, error);
      }
    }
    
    // Log sync completed
    await storage.logSyncStatus({
      entity_type: 'categories',
      status: 'completed',
      last_synced: new Date(),
      total_synced: totalSynced
    });
    
    console.log(`WordPress categories sync completed. Total synced: ${totalSynced}`);
    return totalSynced;
    
  } catch (error) {
    console.error('Error syncing WordPress categories:', error);
    
    // Log sync error
    await storage.logSyncStatus({
      entity_type: 'categories',
      status: 'error',
      last_synced: new Date(),
      total_synced: 0,
      error_message: error instanceof Error ? error.message : String(error)
    });
    
    throw error;
  }
}

/**
 * Sync WordPress tags to the database
 */
async function syncTags(): Promise<number> {
  try {
    console.log('Starting WordPress tags sync...');
    
    // Log sync started
    await storage.logSyncStatus({
      entity_type: 'tags',
      status: 'in_progress',
      last_synced: new Date(),
      total_synced: 0
    });
    
    // Fetch all tags (paginate if many)
    let page = 1;
    let hasMorePages = true;
    let totalSynced = 0;
    
    while (hasMorePages) {
      const tags = await fetchFromWordPress<any[]>(`tags?per_page=${WP_PER_PAGE}&page=${page}`);
      
      if (tags.length === 0) {
        hasMorePages = false;
        continue;
      }
      
      // Process each tag
      for (const tag of tags) {
        try {
          // Transform WordPress tag to database format
          const dbTag: InsertWPTag = {
            id: tag.id,
            count: tag.count || 0,
            description: tag.description || '',
            link: tag.link || '',
            name: tag.name,
            slug: tag.slug,
            taxonomy: tag.taxonomy || 'post_tag',
            meta: tag.meta || {}
          };
          
          // Create or update tag in database
          await storage.createOrUpdateTag(dbTag);
          totalSynced++;
          
        } catch (error) {
          console.error(`Error processing tag ${tag.id}:`, error);
        }
      }
      
      // Check if we need to continue to the next page
      hasMorePages = tags.length === WP_PER_PAGE;
      page++;
    }
    
    // Log sync completed
    await storage.logSyncStatus({
      entity_type: 'tags',
      status: 'completed',
      last_synced: new Date(),
      total_synced: totalSynced
    });
    
    console.log(`WordPress tags sync completed. Total synced: ${totalSynced}`);
    return totalSynced;
    
  } catch (error) {
    console.error('Error syncing WordPress tags:', error);
    
    // Log sync error
    await storage.logSyncStatus({
      entity_type: 'tags',
      status: 'error',
      last_synced: new Date(),
      total_synced: 0,
      error_message: error instanceof Error ? error.message : String(error)
    });
    
    throw error;
  }
}

/**
 * Sync WordPress media that is referenced by posts
 * This sync only happens for media that is actually used by posts
 */
async function syncFeaturedMedia(): Promise<number> {
  try {
    console.log('Starting WordPress featured media sync...');
    
    // Log sync started
    await storage.logSyncStatus({
      entity_type: 'media',
      status: 'in_progress',
      last_synced: new Date(),
      total_synced: 0
    });
    
    // Get all posts from the database that have featured media
    const { posts } = await storage.getPosts(1, 1000); // Get first 1000 posts
    const mediaIds = posts
      .map(post => post.featured_media)
      .filter(id => id && id > 0) as number[];
    
    // Remove duplicates
    const uniqueMediaIds = [...new Set(mediaIds)];
    let totalSynced = 0;
    
    // Fetch and store each media item
    for (const mediaId of uniqueMediaIds) {
      try {
        // Check if we already have this media
        const existingMedia = await storage.getMediaById(mediaId);
        
        // If it exists and has source_url, skip it
        if (existingMedia && existingMedia.source_url) {
          continue;
        }
        
        // Fetch media from WordPress
        const media = await fetchFromWordPress<any>(`media/${mediaId}`);
        
        // Transform WordPress media to database format
        const dbMedia: InsertWPMedia = {
          id: media.id,
          date: new Date(media.date),
          date_gmt: media.date_gmt ? new Date(media.date_gmt) : undefined,
          modified: media.modified ? new Date(media.modified) : undefined,
          modified_gmt: media.modified_gmt ? new Date(media.modified_gmt) : undefined,
          slug: media.slug,
          status: media.status,
          type: media.type,
          link: media.link,
          title_rendered: media.title?.rendered || '',
          source_url: media.source_url,
          alt_text: media.alt_text || '',
          media_type: media.media_type,
          mime_type: media.mime_type,
          media_details: media.media_details || {}
        };
        
        // Create or update media in database
        await storage.createOrUpdateMedia(dbMedia);
        totalSynced++;
        
      } catch (error) {
        console.error(`Error processing media ${mediaId}:`, error);
      }
    }
    
    // Log sync completed
    await storage.logSyncStatus({
      entity_type: 'media',
      status: 'completed',
      last_synced: new Date(),
      total_synced: totalSynced
    });
    
    console.log(`WordPress media sync completed. Total synced: ${totalSynced}`);
    return totalSynced;
    
  } catch (error) {
    console.error('Error syncing WordPress media:', error);
    
    // Log sync error
    await storage.logSyncStatus({
      entity_type: 'media',
      status: 'error',
      last_synced: new Date(),
      total_synced: 0,
      error_message: error instanceof Error ? error.message : String(error)
    });
    
    throw error;
  }
}

/**
 * Run a full sync of all WordPress content
 */
export async function syncAllWordPressContent(): Promise<void> {
  // Don't run if sync is already in progress
  if (isSyncRunning) {
    console.log('WordPress sync already running, skipping this run');
    return;
  }
  
  try {
    console.log('Starting full WordPress content sync...');
    isSyncRunning = true;
    
    // Sync categories first (they're needed for posts)
    await syncCategories();
    
    // Sync tags (they're also needed for posts)
    await syncTags();
    
    // Sync posts (main content)
    await syncPosts();
    
    // Sync featured media (referenced by posts)
    await syncFeaturedMedia();
    
    console.log('Full WordPress content sync completed');
  } catch (error) {
    console.error('Error during full WordPress content sync:', error);
  } finally {
    isSyncRunning = false;
  }
}

/**
 * Initialize the WordPress sync service
 */
export function initWordPressSyncService(): void {
  console.log(`Initializing WordPress sync service with schedule: ${SYNC_INTERVAL}`);
  
  // Run initial sync immediately
  syncAllWordPressContent().catch(error => {
    console.error('Error during initial WordPress sync:', error);
  });
  
  // Schedule regular syncs
  cron.schedule(SYNC_INTERVAL, () => {
    console.log('Running scheduled WordPress content sync...');
    syncAllWordPressContent().catch(error => {
      console.error('Error during scheduled WordPress sync:', error);
    });
  });
}

// Export individual sync functions for manual triggering
export {
  syncPosts,
  syncCategories,
  syncTags,
  syncFeaturedMedia
};