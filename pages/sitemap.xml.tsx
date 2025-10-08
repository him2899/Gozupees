import { GetServerSideProps } from 'next';
import { generateSitemapUrl, formatSitemapXml, getPagePriority, getPageChangefreq } from '../lib/sitemap-utils';

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Base URL of your site
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://gozupees.com' : 'http://localhost:5000';

  // Static pages - primary pages only
  const staticPages = [
    '',
    '/about',
    '/pricing',
    '/contact',
    '/integrations',
    '/newsletter',
    '/case-studies',
    '/privacy-policy',
    '/blog',
    '/terms-of-use',
    '/cookie-policy',
    '/acceptable-use-policy',
    '/ethics',
    '/ai-employees',
    
    // AI Voice Agents (new structure)
    '/ai-voice-agents/business-support',
    '/ai-voice-agents/customer-support-property-management',
    '/ai-voice-agents/lead-qualification-mortgage',
    '/ai-voice-agents/multilingual',
    '/ai-voice-agents/concierge',
    '/ai-voice-agents/customer-service',
    '/ai-voice-agents/sales-qualification',
    '/ai-voice-agents/lead-validation',
    '/ai-voice-agents/data-collection',
    '/ai-voice-agents/smart-scheduling',
    '/ai-voice-agents/answering-service',
    '/ai-voice-agents/inbound-calls',
    '/ai-voice-agents/business-concierge',
    '/ai-voice-agents/gp-triage',
    '/ai-voice-agents/receptionist',
    '/ai-voice-agents/reminder-calls',
    '/ai-voice-agents/lead-reactivation',
    '/ai-voice-agents/hr-multinational',
  ];

  // Blog pages - fetch from API
  let blogPages: string[] = [];
  let individualPosts: string[] = [];
  
  try {
    // Get blog categories
    const categoriesResponse = await fetch(`${baseUrl}/api/db/categories`);
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      categories.forEach((category: any) => {
        blogPages.push(`/blog/category/${category.slug}`);
      });
    }

    // Get individual blog posts
    const postsResponse = await fetch(`${baseUrl}/api/db/posts?per_page=100`);
    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      if (postsData.posts) {
        postsData.posts.forEach((post: any) => {
          individualPosts.push(`/blog/${post.slug}`);
        });
      }
    }

    // Add blog index
    blogPages.push('/blog');
    
  } catch (error) {
    console.error('Error fetching blog data for sitemap:', error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPages, ...individualPosts];

  // Generate sitemap URLs using utility functions
  const sitemapUrls = allPages
    .filter((page, index, self) => self.indexOf(page) === index) // Remove duplicates
    .map((page) => {
      return generateSitemapUrl(baseUrl, page, {
        priority: getPagePriority(page),
        changefreq: getPageChangefreq(page),
        lastmod: new Date()
      });
    });

  // Generate sitemap XML
  const sitemap = formatSitemapXml(sitemapUrls);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;