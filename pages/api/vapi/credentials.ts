import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { vapiCredentials, insertVapiCredentialSchema } from '../../../shared/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const credentials = await db.select().from(vapiCredentials).where(eq(vapiCredentials.isActive, true));
        return res.status(200).json(credentials);

      case 'POST':
        const validatedData = insertVapiCredentialSchema.parse(req.body);
        const [newCredential] = await db.insert(vapiCredentials).values(validatedData).returning();
        return res.status(201).json(newCredential);

      case 'PUT':
        const { id, ...updateData } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'ID is required for updates' });
        }
        const [updatedCredential] = await db
          .update(vapiCredentials)
          .set(updateData)
          .where(eq(vapiCredentials.id, id))
          .returning();
        return res.status(200).json(updatedCredential);

      case 'DELETE':
        const credentialId = req.query.id as string;
        if (!credentialId) {
          return res.status(400).json({ error: 'ID is required' });
        }
        await db
          .update(vapiCredentials)
          .set({ isActive: false })
          .where(eq(vapiCredentials.id, parseInt(credentialId)));
        return res.status(200).json({ message: 'Credential deactivated successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('VAPI credentials API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}