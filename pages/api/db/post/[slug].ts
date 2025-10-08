import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../server/db';
import { wp_posts } from '../../../../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ 
        error: 'Slug parameter is required',
        message: 'Please provide a valid blog post slug'
      });
    }
    
    console.log(`Fetching post with slug: ${slug} from database`);
    
    // Fetch the specific blog post by slug
    const [post] = await db
      .select()
      .from(wp_posts)
      .where(eq(wp_posts.slug, slug))
      .limit(1);
    
    if (!post) {
      console.log(`Post with slug '${slug}' not found in database`);
      return res.status(404).json({ 
        error: 'Post not found',
        message: `Blog post with slug "${slug}" not found`
      });
    }
    
    console.log(`Found post: ${post.title_rendered}`);
    
    // Format post to match the expected structure
    const formattedPost = {
      id: post.id,
      slug: post.slug,
      title: {
        rendered: post.title_rendered
      },
      content: {
        rendered: post.content_rendered
      },
      excerpt: {
        rendered: post.excerpt_rendered || ''
      },
      featured_media_url: post.featured_media_url,
      featured_media_alt: post.featured_media_alt || '',
      date: post.date.toISOString(),
      modified: post.modified?.toISOString(),
      categories: post.categories || [],
      tags: post.tags || [],
      author_name: post.author_name,
      author_avatar: post.author_avatar,
      status: post.status,
      type: post.type,
      link: post.link
    };
    
    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    
    return res.status(200).json(formattedPost);
    
  } catch (error) {
    console.error('Error fetching blog post from database:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch blog post from database',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}