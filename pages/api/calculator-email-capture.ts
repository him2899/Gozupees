import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { calculator_email_captures, insertCalculatorEmailCaptureSchema } from '../../shared/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate the request data
    const validatedData = insertCalculatorEmailCaptureSchema.parse(req.body);

    // Insert into database
    const [result] = await db
      .insert(calculator_email_captures)
      .values(validatedData)
      .returning();

    res.status(200).json({ 
      success: true, 
      message: 'Email captured successfully',
      id: result.id 
    });
  } catch (error: any) {
    console.error('Error capturing calculator email:', error);
    
    if (error?.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Invalid data', 
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: 'Failed to capture email' 
    });
  }
}