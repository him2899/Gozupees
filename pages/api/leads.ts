import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { db } from '../../server/db';
import { leads, insertNewsletterLeadSchema, insertNewsletterSignupLeadSchema, insertBookCallLeadSchema, insertVoiceDemoLeadSchema, insertAIDemoIndustryLeadSchema, insertHomeBookCallLeadSchema } from '../../shared/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { source, ...data } = req.body;

    let validatedData;
    let insertData;

    switch (source) {
      case 'newsletter':
        validatedData = insertNewsletterLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: 'Newsletter Subscriber',
          email: validatedData.email,
          phoneNumber: 'N/A',
          useCase: 'Newsletter',
          source: 'newsletter',
        };
        break;

      case 'newsletter_signup':
        validatedData = insertNewsletterSignupLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: 'Newsletter Subscriber',
          email: validatedData.email,
          phoneNumber: 'N/A',
          useCase: 'Newsletter Signup',
          source: 'newsletter_signup',
        };
        break;

      case 'book_call':
        validatedData = insertBookCallLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: `${validatedData.firstName} ${validatedData.lastName}`,
          email: validatedData.email,
          phoneNumber: validatedData.phoneNumber,
          useCase: validatedData.useCase,
          source: 'book_call',
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          company: validatedData.company,
        };
        break;

      case 'voice_demo':
        validatedData = insertVoiceDemoLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: validatedData.agentName + ' Demo Request',
          email: validatedData.email || 'N/A',
          phoneNumber: validatedData.phoneNumber,
          useCase: `Voice Demo - ${validatedData.agentFunction}`,
          source: 'voice_demo',
          agentName: validatedData.agentName,
          agentFunction: validatedData.agentFunction,
        };
        break;

      case 'ai_demo_in_industry':
        validatedData = insertAIDemoIndustryLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: validatedData.fullName,
          email: validatedData.email,
          phoneNumber: validatedData.phoneNumber,
          useCase: validatedData.useCase,
          source: 'ai_demo_in_industry',
        };
        break;

      case 'home_bookacall':
        validatedData = insertHomeBookCallLeadSchema.parse({ ...data, source });
        insertData = {
          fullName: `${validatedData.firstName} ${validatedData.lastName}`,
          email: validatedData.email,
          phoneNumber: 'N/A',
          useCase: validatedData.interest,
          source: 'home_bookacall',
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          company: validatedData.company,
        };
        break;

      default:
        return res.status(400).json({ error: 'Invalid source type' });
    }

    const result = await db.insert(leads).values([insertData]).returning();

    res.status(201).json({ 
      success: true, 
      lead: result[0],
      message: 'Lead saved successfully'
    });

  } catch (error) {
    console.error('Error saving lead:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}