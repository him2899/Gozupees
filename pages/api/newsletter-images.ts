import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { newsletter_images } from '../../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const images = await db.select().from(newsletter_images);
    const imageMap = images.reduce((acc, img) => {
      acc[img.newsletter_id] = img;
      return acc;
    }, {} as Record<string, any>);
    
    res.status(200).json(imageMap);
  } catch (error) {
    console.error('Error fetching newsletter images:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter images' });
  }
}