import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { vapiAgents, vapiCredentials, insertVapiAgentSchema } from '../../../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const agents = await db
          .select({
            id: vapiAgents.id,
            name: vapiAgents.name,
            agentId: vapiAgents.agentId,
            description: vapiAgents.description,
            isActive: vapiAgents.isActive,
            createdAt: vapiAgents.createdAt,
            credentialName: vapiCredentials.name,
            publicKey: vapiCredentials.publicKey,
          })
          .from(vapiAgents)
          .leftJoin(vapiCredentials, eq(vapiAgents.credentialId, vapiCredentials.id))
          .where(eq(vapiAgents.isActive, true));
        
        return res.status(200).json(agents);

      case 'POST':
        const validatedData = insertVapiAgentSchema.parse(req.body);
        const [newAgent] = await db.insert(vapiAgents).values(validatedData).returning();
        return res.status(201).json(newAgent);

      case 'PUT':
        const { id, ...updateData } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'ID is required for updates' });
        }
        const [updatedAgent] = await db
          .update(vapiAgents)
          .set(updateData)
          .where(eq(vapiAgents.id, id))
          .returning();
        return res.status(200).json(updatedAgent);

      case 'DELETE':
        const agentId = req.query.id as string;
        if (!agentId) {
          return res.status(400).json({ error: 'ID is required' });
        }
        await db
          .update(vapiAgents)
          .set({ isActive: false })
          .where(eq(vapiAgents.id, parseInt(agentId)));
        return res.status(200).json({ message: 'Agent deactivated successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('VAPI agents API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}