import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { vapiAgents, vapiCredentials, vapiCallLogs } from '../../../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agentName, phoneNumber } = req.body;

    if (!agentName) {
      return res.status(400).json({ error: 'Agent name is required' });
    }

    // Get agent details with credentials
    const [agentData] = await db
      .select({
        agentId: vapiAgents.agentId,
        agentDbId: vapiAgents.id,
        agentName: vapiAgents.name,
        publicKey: vapiCredentials.publicKey,
        privateKey: vapiCredentials.privateKey,
      })
      .from(vapiAgents)
      .leftJoin(vapiCredentials, eq(vapiAgents.credentialId, vapiCredentials.id))
      .where(eq(vapiAgents.name, agentName) && eq(vapiAgents.isActive, true));

    if (!agentData) {
      return res.status(404).json({ error: 'Agent not found or inactive' });
    }

    if (!agentData.publicKey) {
      return res.status(400).json({ error: 'No VAPI credentials configured for this agent' });
    }

    // For web calls, return the configuration for client-side VAPI SDK
    if (!phoneNumber) {
      return res.status(200).json({
        success: true,
        agentId: agentData.agentId,
        publicKey: agentData.publicKey,
        agentName: agentData.agentName,
        callType: 'web'
      });
    }

    // For phone calls, make server-side API call to VAPI
    if (!agentData.privateKey) {
      return res.status(400).json({ error: 'Private key required for outbound calls' });
    }

    const vapiResponse = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${agentData.privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: agentData.agentId,
        customer: {
          number: phoneNumber
        }
      })
    });

    const vapiData = await vapiResponse.json();

    if (!vapiResponse.ok) {
      console.error('VAPI API Error:', vapiData);
      return res.status(vapiResponse.status).json({ 
        error: 'Failed to initiate VAPI call',
        details: vapiData.message || 'Unknown error'
      });
    }

    // Log the call in database
    await db.insert(vapiCallLogs).values({
      agentId: agentData.agentDbId,
      callId: vapiData.id,
      phoneNumber,
      status: 'initiated'
    });

    return res.status(200).json({
      success: true,
      callId: vapiData.id,
      agentName: agentData.agentName,
      callType: 'phone'
    });

  } catch (error) {
    console.error('Error starting VAPI call:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}