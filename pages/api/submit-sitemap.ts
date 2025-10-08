import { NextApiRequest, NextApiResponse } from 'next';

interface SearchEngineEndpoint {
  name: string;
  url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://gozupees.com' : 'http://localhost:5000';
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  // Search engine submission endpoints
  const searchEngines: SearchEngineEndpoint[] = [
    {
      name: 'Google',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    }
  ];

  const results = [];

  for (const engine of searchEngines) {
    try {
      const response = await fetch(engine.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'GoZupees-Sitemap-Submitter/1.0'
        }
      });

      results.push({
        engine: engine.name,
        status: response.status,
        success: response.ok,
        message: response.ok ? 'Sitemap submitted successfully' : 'Submission failed'
      });
    } catch (error) {
      results.push({
        engine: engine.name,
        status: 500,
        success: false,
        message: 'Network error during submission'
      });
    }
  }

  const successCount = results.filter(r => r.success).length;

  res.status(200).json({
    sitemapUrl,
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      successful: successCount,
      failed: results.length - successCount
    }
  });
}