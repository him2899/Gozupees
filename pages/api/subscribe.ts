import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../server/db';
import { newsletter_subscribers } from '../../shared/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const subscribeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  ai_revops: z.boolean().optional().default(false),
  masters_of_dtc: z.boolean().optional().default(false),
  monthly_digest: z.boolean().optional().default(false),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validation = subscribeSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validation.error.errors 
      });
    }

    const { name, email, ai_revops, masters_of_dtc, monthly_digest } = validation.data;

    // Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(newsletter_subscribers)
      .where(eq(newsletter_subscribers.email, email))
      .limit(1);

    if (existingSubscriber.length > 0) {
      // Update existing subscriber preferences
      await db
        .update(newsletter_subscribers)
        .set({
          name,
          ai_revops: ai_revops || existingSubscriber[0].ai_revops,
          masters_of_dtc: masters_of_dtc || existingSubscriber[0].masters_of_dtc,
          monthly_digest: monthly_digest || existingSubscriber[0].monthly_digest,
        })
        .where(eq(newsletter_subscribers.email, email));

      return res.status(200).json({ 
        message: 'Newsletter preferences updated successfully',
        updated: true
      });
    } else {
      // Insert new subscriber
      await db.insert(newsletter_subscribers).values({
        name,
        email,
        ai_revops,
        masters_of_dtc,
        monthly_digest,
      });

      return res.status(200).json({ 
        message: 'Successfully subscribed to newsletters',
        updated: false
      });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}