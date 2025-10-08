import { NextApiRequest, NextApiResponse } from 'next';
// Temporarily disabled until team members schema is added to shared/schema.ts
// import { db } from '../../server/db';
// import { teamMembers, insertTeamMemberSchema } from '../../shared/schema';
import { ZodError } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Temporarily return empty array until team members schema is implemented
    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    // Database operations temporarily disabled
    return res.status(501).json({ 
      error: 'Team members database schema not yet implemented' 
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}