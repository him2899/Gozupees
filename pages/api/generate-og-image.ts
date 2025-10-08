import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, type = 'default' } = req.query;

  // Generate SVG-based Open Graph image
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Logo/Brand Area -->
      <rect x="60" y="60" width="80" height="80" rx="20" fill="white" opacity="0.1"/>
      <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">GZ</text>
      
      <!-- Main Title -->
      <text x="60" y="280" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
        <tspan x="60" dy="0">${title ? String(title).substring(0, 40) : 'GoZupees'}</tspan>
        ${title && String(title).length > 40 ? `<tspan x="60" dy="60">${String(title).substring(40, 80)}</tspan>` : ''}
      </text>
      
      <!-- Description -->
      <text x="60" y="400" fill="white" font-family="Arial, sans-serif" font-size="24" opacity="0.9">
        <tspan x="60" dy="0">${description ? String(description).substring(0, 60) : 'AI Voice Agents for Sales & Marketing'}</tspan>
        ${description && String(description).length > 60 ? `<tspan x="60" dy="30">${String(description).substring(60, 120)}</tspan>` : ''}
      </text>
      
      <!-- Brand Name -->
      <text x="60" y="550" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="600" opacity="0.8">GoZupees.com</text>
      
      <!-- Accent Elements -->
      <circle cx="1000" cy="150" r="60" fill="white" opacity="0.1"/>
      <circle cx="1100" cy="250" r="40" fill="white" opacity="0.05"/>
      <circle cx="950" cy="300" r="80" fill="white" opacity="0.1"/>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.status(200).send(svg);
}