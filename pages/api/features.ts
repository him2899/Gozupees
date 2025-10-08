import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { features, insertFeatureSchema } from '../../shared/schema';
import { asc } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allFeatures = await db
        .select()
        .from(features)
        .orderBy(asc(features.order));
      
      console.log('Fetched features from database:', allFeatures);
      res.status(200).json(allFeatures);
    } catch (error) {
      console.error('Error fetching features:', error);
      res.status(500).json({ error: 'Failed to fetch features' });
    }
  } else if (req.method === 'POST') {
    try {
      const validatedData = insertFeatureSchema.parse(req.body);
      const [newFeature] = await db
        .insert(features)
        .values(validatedData)
        .returning();
      
      res.status(201).json(newFeature);
    } catch (error) {
      console.error('Error creating feature:', error);
      res.status(500).json({ error: 'Failed to create feature' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}