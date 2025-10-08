import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      email,
      company,
      phone,
      requestType,
      selectedPlan,
      currency
    } = req.body;

    // Basic validation
    if (!firstName || !email || !company || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log the trial request (in a real app, you'd save to database)
    console.log('Trial Request Received:', {
      timestamp: new Date().toISOString(),
      firstName,
      email,
      company,
      phone,
      requestType,
      selectedPlan,
      currency
    });

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Add to CRM system
    // 4. Trigger automated workflows

    return res.status(201).json({ 
      success: true, 
      message: 'Trial request submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing trial request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}