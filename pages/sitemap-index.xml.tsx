import { GetServerSideProps } from 'next';

function SitemapIndex() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Base URL of your site
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://gozupees.com' : 'http://localhost:5000';
  
  const currentDate = new Date().toISOString();

  // Generate sitemap index XML
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
    </sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapIndex);
  res.end();

  return {
    props: {},
  };
};

export default SitemapIndex;