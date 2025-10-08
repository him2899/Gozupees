export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function generateSitemapUrl(
  baseUrl: string,
  path: string,
  options: {
    lastmod?: Date;
    changefreq?: SitemapURL['changefreq'];
    priority?: number;
  } = {}
): SitemapURL {
  const {
    lastmod = new Date(),
    changefreq = 'monthly',
    priority = 0.5
  } = options;

  return {
    loc: `${baseUrl}${path}`,
    lastmod: lastmod.toISOString(),
    changefreq,
    priority: priority.toFixed(1)
  };
}

export function formatSitemapXml(urls: SitemapURL[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
}

export function getPagePriority(path: string): number {
  if (path === '') return 1.0; // Homepage
  if (path.includes('/pricing') || path.includes('/ai-employees')) return 0.9; // High priority pages
  if (path.includes('/contact') || path.includes('/book-demo')) return 0.8; // Conversion pages
  if (path.includes('/case-studies') || path.includes('/ai-voice-agents/') || path.includes('/industries/')) return 0.7; // Product pages
  if (path.includes('/blog') && !path.includes('/blog/category/')) return 0.7; // Blog posts
  if (path.includes('/blog')) return 0.8; // Blog categories and index
  if (path.includes('/ethics') || path.includes('/privacy-policy')) return 0.5; // Legal pages
  return 0.6; // Other pages
}

export function getPageChangefreq(path: string): SitemapURL['changefreq'] {
  if (path === '') return 'weekly'; // Homepage
  if (path.includes('/blog/') && !path.includes('/blog/category/')) return 'monthly'; // Blog posts
  if (path.includes('/blog')) return 'weekly'; // Blog categories and index
  if (path.includes('/pricing') || path.includes('/agents')) return 'monthly'; // Product pages
  return 'yearly'; // Static pages
}