import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public/videos');
    
    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB limit
      filter: (part) => {
        return !!(part.mimetype && part.mimetype.startsWith('video/'));
      },
    });

    const [fields, files] = await form.parse(req);
    
    const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
    
    if (!videoFile) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = videoFile.originalFilename || 'video';
    const extension = path.extname(originalName);
    const fileName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}${extension}`;
    const finalPath = path.join(uploadDir, fileName);

    // Move file to final location
    await fs.rename(videoFile.filepath, finalPath);

    // Return the public URL
    const videoUrl = `/videos/${fileName}`;

    return res.status(200).json({
      success: true,
      videoUrl,
      fileName,
    });

  } catch (error) {
    console.error('Video upload error:', error);
    return res.status(500).json({ error: 'Failed to upload video' });
  }
}