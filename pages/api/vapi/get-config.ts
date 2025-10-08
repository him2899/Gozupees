import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { vapiAgents, vapiCredentials } from '../../../shared/schema';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agentName } = req.body;

    if (!agentName) {
      return res.status(400).json({ error: 'Agent name is required' });
    }

    // Get agent configuration with credentials
    const [agentConfig] = await db
      .select({
        agentId: vapiAgents.agentId,
        agentName: vapiAgents.name,
        publicKey: vapiCredentials.publicKey,
      })
      .from(vapiAgents)
      .leftJoin(vapiCredentials, eq(vapiAgents.credentialId, vapiCredentials.id))
      .where(and(
        eq(vapiAgents.name, agentName),
        eq(vapiAgents.isActive, true),
        eq(vapiCredentials.isActive, true)
      ))
      .limit(1);

    if (!agentConfig) {
      return res.status(404).json({ 
        error: `Agent configuration not found for: ${agentName}` 
      });
    }

    if (!agentConfig.publicKey) {
      return res.status(400).json({ 
        error: `No active VAPI credentials found for agent: ${agentName}` 
      });
    }

    return res.status(200).json({
      publicKey: agentConfig.publicKey,
      agentId: agentConfig.agentId,
      agentName: agentConfig.agentName
    });

  } catch (error) {
    console.error('Error getting VAPI config:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}