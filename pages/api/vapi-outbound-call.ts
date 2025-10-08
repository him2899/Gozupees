import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber, agentType = 'chloe' } = req.body;

    // Validate phone number
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Basic phone number validation (should start with + and contain only digits, spaces, hyphens, parentheses)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Ensure phone number starts with + for international format
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+1${cleanPhone}`;

    // VAPI credentials and configuration
    const vapiToken = '20c78e28-08a1-4304-9305-47f28f9c3f98';
    
    // Agent-specific configuration
    const agentConfig = {
      chloe: {
        assistantId: '3edd06ca-fb7f-4afa-9bc8-b7de05545931',
        phoneNumberId: 'd30b90ca-0b67-422b-8715-8b3af8cbe5e3'
      },
      zeno: {
        assistantId: 'e7e0a007-f1cf-46bd-9196-dfd262875067',
        phoneNumberId: 'e256b0d8-0e2c-4305-9e07-bd5e3d429235'
      },
      sam: {
        assistantId: 'c51c2219-5508-4aac-808f-4293f4560f8c',
        phoneNumberId: 'd30b90ca-0b67-422b-8715-8b3af8cbe5e3'
      },
      ava: {
        assistantId: '4137ad13-597e-48ed-a9dd-4446f0c73b5a',
        phoneNumberId: 'd30b90ca-0b67-422b-8715-8b3af8cbe5e3'
      }
    };

    const currentAgent = agentConfig[agentType as keyof typeof agentConfig] || agentConfig.chloe;
    const assistantId = currentAgent.assistantId;
    const phoneNumberId = currentAgent.phoneNumberId;

    // Make the API call to VAPI
    const vapiResponse = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId,
        phoneNumberId,
        customer: {
          number: formattedPhone
        }
      })
    });

    const vapiData = await vapiResponse.json();

    if (!vapiResponse.ok) {
      console.error('VAPI API Error:', vapiData);
      return res.status(vapiResponse.status).json({ 
        error: 'Failed to initiate call',
        details: vapiData.message || 'Unknown error'
      });
    }

    console.log('VAPI call initiated successfully:', vapiData);

    const agentNames = {
      chloe: 'Chloe',
      zeno: 'Zeno',
      sam: 'Sam',
      ava: 'Ava'
    };

    return res.status(200).json({
      success: true,
      message: `${agentNames[agentType as keyof typeof agentNames] || 'Agent'} will call you shortly!`,
      callId: vapiData.id
    });

  } catch (error) {
    console.error('Error initiating VAPI outbound call:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}