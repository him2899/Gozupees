import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { aiAgentUseCases } from '../../shared/schema';
import { asc } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const useCases = await db
        .select({
          id: aiAgentUseCases.id,
          industry: aiAgentUseCases.industry,
          useCase: aiAgentUseCases.useCase,
          tab: aiAgentUseCases.tab,
          miniTags: aiAgentUseCases.miniTags,
          icon: aiAgentUseCases.icon,
          order: aiAgentUseCases.order,
          createdAt: aiAgentUseCases.createdAt
        })
        .from(aiAgentUseCases)
        .orderBy(asc(aiAgentUseCases.order));

      console.log('Fetched AI agent use cases from database:', useCases);
      res.status(200).json(useCases);
    } catch (error) {
      console.error('Error fetching AI agent use cases:', error);
      res.status(500).json({ error: 'Failed to fetch AI agent use cases' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}