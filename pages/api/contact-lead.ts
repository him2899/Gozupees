import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { z, ZodError } from 'zod';

// ✅ Schema validation
const insertContactLeadSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  source: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // ✅ Validate incoming request
    const validatedData = insertContactLeadSchema.parse(req.body);

    // ✅ Configure Nodemailer transporter (always Gmail for consistency)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Main email to Himanshu
    const mailOptions = {
      from: `"GoZupees Contact Form" <${process.env.SMTP_USER}>`,
      to: 'himanshu@gozupees.com',
      subject: `New Contact Form Submission – ${validatedData.fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.fullName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${validatedData.message.replace(/\n/g, '<br/>')}</p>
        <hr/>
        <p>Source: ${validatedData.source || 'Website Contact Form'}</p>
      `,
    };

    // ✅ Send main email
    await transporter.sendMail(mailOptions);

    // ✅ Send confirmation email to the sender
    try {
      await transporter.sendMail({
        from: `"GoZupees Team" <${process.env.SMTP_USER}>`,
        to: validatedData.email,
        subject: 'We’ve received your message – GoZupees',
        html: `
          <h3>Hi ${validatedData.fullName},</h3>
          <p>Thank you for contacting <strong>GoZupees</strong>! We’ve received your message and our team will get back to you shortly.</p>
          <hr/>
          <p><strong>Your Submission:</strong></p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${validatedData.message.replace(/\n/g, '<br/>')}</p>
          <p style="margin-top:20px;">Warm regards,<br/>The GoZupees Team</p>
        `,
      });
    } catch (confirmationError) {
      console.warn('⚠️ Confirmation email failed:', confirmationError);
    }

    // ✅ Response to frontend
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting us.',
    });
  } catch (error) {
    console.error('❌ Error sending contact email:', error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
