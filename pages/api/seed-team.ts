import { NextApiRequest, NextApiResponse } from 'next';
// Temporarily disabled database operations until team members schema is added
// import { db } from '../../server/db';
// import { teamMembers } from '../../shared/schema';

const teamMembersData = [
  {
    name: "Sandeep Bansal",
    title: "Founder & CEO", 
    description: "With 30+ years of experience in digital marketing and a background in complex data systems, Sandeep leads GoZupees' vision and strategy.",
    order: 1
  },
  {
    name: "Aashi Garg",
    title: "Marketing Strategist",
    description: "Aashi is our lead marketing strategist and has a flair for creative thinking. She is great at orchestrating game-changing ad campaigns, leading high-performing email programs, and delivering impressive results.",
    order: 2
  },
  {
    name: "Chirayu Yadav", 
    title: "AI Automation & BI Leader",
    description: "Chirayu leads GoZupees' AI automation and business intelligence initiatives, designing the systems that power our data-driven strategies and technical innovations.",
    order: 3
  },

];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Database operations temporarily disabled - team members schema not yet implemented
    // await db.delete(teamMembers);
    // const insertedMembers = [];
    // for (const member of teamMembersData) {
    //   const [inserted] = await db.insert(teamMembers).values(member).returning();
    //   insertedMembers.push(inserted);
    // }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Team members seed endpoint ready - database schema pending',
      teamMembers: teamMembersData
    });
  } catch (error) {
    console.error('Error in seed team endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}