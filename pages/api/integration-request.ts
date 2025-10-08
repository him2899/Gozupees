import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { leads, insertIntegrationRequestSchema } from '../../shared/schema';
import { ZodError } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const validatedData = insertIntegrationRequestSchema.parse(req.body);
    
    // Insert into database
    const [newLead] = await db.insert(leads).values({
      fullName: validatedData.fullName,
      email: validatedData.email,
      phoneNumber: '', // Required field, empty for integration request
      company: validatedData.company,
      notes: validatedData.message || 'Integration request submitted',
      source: validatedData.source,
      status: 'new',
      useCase: 'Integration Request',
    }).returning();

    return res.status(201).json({ 
      success: true, 
      message: 'Integration request submitted successfully! We\'ll review and get back to you soon.',
      leadId: newLead.id 
    });
  } catch (error) {
    console.error('Error creating integration request:', error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors 
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}