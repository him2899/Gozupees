import type { NextApiRequest, NextApiResponse } from 'next';

// Mock tags for deployment stability  
const mockTags = [
  { id: 1, name: 'AI Voice Agents', slug: 'ai-voice-agents', count: 15 },
  { id: 2, name: 'Lead Generation', slug: 'lead-generation', count: 12 },
  { id: 3, name: 'Customer Service', slug: 'customer-service', count: 8 },
  { id: 4, name: 'Sales Automation', slug: 'sales-automation', count: 10 },
  { id: 5, name: 'Healthcare', slug: 'healthcare', count: 6 },
  { id: 6, name: 'Real Estate', slug: 'real-estate', count: 7 },
  { id: 7, name: 'Financial Services', slug: 'financial-services', count: 9 },
  { id: 8, name: 'Technology', slug: 'technology', count: 11 },
  { id: 9, name: 'Business Intelligence', slug: 'business-intelligence', count: 5 }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(mockTags);
}