import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the assistant IDs from environment variables
    const assistantIds = {
      English: process.env.CHLOE_ENGLISH_ASSISTANT_ID,
      Spanish: process.env.CHLOE_SPANISH_ASSISTANT_ID,
      German: process.env.CHLOE_GERMAN_ASSISTANT_ID,
      Dutch: process.env.CHLOE_DUTCH_ASSISTANT_ID,
    };

    // Check if any assistant IDs are missing
    const missingIds = Object.entries(assistantIds)
      .filter(([_, id]) => !id)
      .map(([lang, _]) => lang);

    if (missingIds.length > 0) {
      return res.status(500).json({ 
        error: `Missing assistant IDs for: ${missingIds.join(', ')}` 
      });
    }

    res.status(200).json({ assistantIds });
  } catch (error) {
    console.error('Error fetching multilingual config:', error);
    res.status(500).json({ error: 'Failed to fetch multilingual configuration' });
  }
}