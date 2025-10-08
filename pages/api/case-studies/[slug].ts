import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { caseStudies } from '../../../shared/schema';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid slug parameter' });
      }
      
      const result = await db
        .select()
        .from(caseStudies)
        .where(and(
          eq(caseStudies.slug, slug),
          eq(caseStudies.published, true)
        ))
        .limit(1);
      
      if (result.length === 0) {
        return res.status(404).json({ error: 'Case study not found' });
      }
      
      const study = result[0];
      
      // Parse array fields - handle PostgreSQL array format
      const parsePostgreSQLArray = (arrayString: string | null): string[] => {
        if (!arrayString) return [];
        // Remove the curly braces and split by comma, then clean quotes
        return arrayString
          .replace(/^\{|\}$/g, '') // Remove { and }
          .split('","')
          .map(item => item.replace(/^"|"$/g, '')) // Remove surrounding quotes
          .filter(Boolean);
      };

      const parseConversationExamples = (arrayString: string | null): any[] => {
        if (!arrayString) return [];
        try {
          // Direct JSON parse - conversation examples are stored as JSON
          return JSON.parse(arrayString);
        } catch (error) {
          console.error('Error parsing conversation examples:', error);
          return [];
        }
      };

      const formattedStudy = {
        ...study,
        features: parsePostgreSQLArray(study.features),
        capabilities: parsePostgreSQLArray(study.capabilities),
        conversationExamples: parseConversationExamples(study.conversationExamples),
        metrics: study.metrics ? JSON.parse(study.metrics) : {},
      };
      
      res.status(200).json(formattedStudy);
    } catch (error) {
      console.error('Error fetching case study:', error);
      res.status(500).json({ error: 'Failed to fetch case study' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}