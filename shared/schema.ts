import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// ======================================================
// VAPI Tables
// ======================================================

// VAPI Credentials table
export const vapiCredentials = pgTable('vapi_credentials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // e.g., "Production", "Development", "GZP Account"
  publicKey: text('public_key').notNull(),
  privateKey: text('private_key'), // Optional - for server-side operations
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// VAPI Agents table
export const vapiAgents = pgTable('vapi_agents', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // e.g., "Chloe", "Zeno", "Maya"
  agentId: text('agent_id').notNull(), // VAPI assistant ID
  description: text('description'),
  credentialId: serial('credential_id').references(() => vapiCredentials.id),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// VAPI Call Logs table
export const vapiCallLogs = pgTable('vapi_call_logs', {
  id: serial('id').primaryKey(),
  agentId: serial('agent_id').references(() => vapiAgents.id),
  callId: text('call_id'), // VAPI call ID
  phoneNumber: text('phone_number'),
  status: text('status'), // 'initiated', 'connected', 'ended', 'failed'
  duration: text('duration'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Insert schemas for VAPI
export const insertVapiCredentialSchema = createInsertSchema(vapiCredentials).omit({
  id: true,
  createdAt: true,
});

export const insertVapiAgentSchema = createInsertSchema(vapiAgents).omit({
  id: true,
  createdAt: true,
});

export const insertVapiCallLogSchema = createInsertSchema(vapiCallLogs).omit({
  id: true,
  createdAt: true,
});

// VAPI Types
export type VapiCredential = typeof vapiCredentials.$inferSelect;
export type InsertVapiCredential = z.infer<typeof insertVapiCredentialSchema>;

export type VapiAgent = typeof vapiAgents.$inferSelect;
export type InsertVapiAgent = z.infer<typeof insertVapiAgentSchema>;

export type VapiCallLog = typeof vapiCallLogs.$inferSelect;
export type InsertVapiCallLog = z.infer<typeof insertVapiCallLogSchema>;

// ======================================================
// Leads Tables
// ======================================================

export const leads = pgTable('leads', {
  id: integer('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phoneNumber: text('phone_number'),
  useCase: text('use_case'),
  status: text('status'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  source: text('source').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  company: text('company'),
  agentName: text('agent_name'),
  agentFunction: text('agent_function'),
});

// Lead form schemas
export const insertAIDemoIndustryLeadSchema = createInsertSchema(leads).pick({
  fullName: true,
  email: true,
  phoneNumber: true,
  useCase: true,
  source: true,
});

export const insertNewsletterLeadSchema = z.object({
  email: z.string().email(),
  source: z.literal('newsletter'),
});

export const insertNewsletterSignupLeadSchema = z.object({
  email: z.string().email(),
  source: z.literal('newsletter_signup'),
});

export const insertBookCallLeadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  useCase: z.string(),
  company: z.string().optional(),
  source: z.literal('book_call'),
});

export const insertVoiceDemoLeadSchema = z.object({
  agentName: z.string(),
  agentFunction: z.string(),
  phoneNumber: z.string(),
  email: z.string().email().optional(),
  source: z.literal('voice_demo'),
});

export const insertHomeBookCallLeadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  company: z.string(),
  interest: z.string(),
  source: z.literal('home_bookacall'),
});

// Lead types
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertAIDemoIndustryLeadSchema>;
export type InsertAIDemoIndustryLead = z.infer<typeof insertAIDemoIndustryLeadSchema>;
