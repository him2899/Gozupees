import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { caseStudies } from '../../../shared/schema';
import { eq, desc, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { featured, industry, category, limit } = req.query;
      
      // Build conditions array
      let conditions = [eq(caseStudies.published, true)];
      
      if (featured === 'true') {
        conditions.push(eq(caseStudies.featured, true));
      }
      
      if (industry) {
        conditions.push(eq(caseStudies.industry, industry as string));
      }
      
      if (category) {
        conditions.push(eq(caseStudies.category, category as string));
      }
      
      // Execute query with all conditions at once
      let queryBuilder = db.select().from(caseStudies).where(and(...conditions));
      
      // Apply ordering
      queryBuilder = queryBuilder.orderBy(desc(caseStudies.order), desc(caseStudies.createdAt)) as any;
      
      // Apply limit if specified
      if (limit) {
        queryBuilder = (queryBuilder as any).limit(parseInt(limit as string));
      }
      
      const results = await queryBuilder;
      
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

      const formattedResults = results.map(study => {
        // Safely parse metrics with fallback
        let metrics = {};
        try {
          metrics = study.metrics ? JSON.parse(study.metrics) : {};
        } catch (error) {
          console.error('Error parsing metrics:', error);
          metrics = {};
        }

        return {
          ...study,
          features: parsePostgreSQLArray(study.features),
          capabilities: parsePostgreSQLArray(study.capabilities),
          conversationExamples: parseConversationExamples(study.conversationExamples),
          metrics,
        };
      });
      
      res.status(200).json(formattedResults);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      res.status(500).json({ error: 'Failed to fetch case studies' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}