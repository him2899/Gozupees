import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

// Disable Next.js default body parser — we’re handling file upload manually
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse multipart form data (resume file included)
  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(400).json({ error: 'Error parsing form data' });
    }

    const { fullName, email, experience, message } = fields;
    const resumeFile = files.resume as formidable.File;

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // ✅ Configure transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // ✅ Build email
      const mailOptions = {
        from: `"GoZupees Careers" <${process.env.SMTP_USER}>`,
        to: 'himanshu@gozupees.com',
        subject: `New Job Application: ${fullName}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Experience:</strong> ${experience || 'N/A'} years</p>
          <p><strong>Message:</strong><br/>${message || 'No message provided'}</p>
          <hr/>
          <p>This message was sent from the GoZupees Careers form.</p>
        `,
        attachments: resumeFile
          ? [
              {
                filename: resumeFile.originalFilename || 'resume.pdf',
                path: resumeFile.filepath,
              },
            ]
          : [],
      };

      // ✅ Send email
      await transporter.sendMail(mailOptions);

      // Delete temp file after sending
      if (resumeFile && resumeFile.filepath) fs.unlinkSync(resumeFile.filepath);

      return res.status(200).json({ success: true, message: 'Application sent successfully' });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  });
}
