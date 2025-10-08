import type { NextApiRequest, NextApiResponse } from 'next';

// Hardcoded categories for deployment stability
const hardcodedCategories = [
  { id: 1, name: 'Sales', slug: 'sales' },
  { id: 2, name: 'Customer Support', slug: 'customer-support' },
  { id: 3, name: 'Marketing', slug: 'marketing' },
  { id: 4, name: 'Healthcare', slug: 'healthcare' },
  { id: 5, name: 'Real Estate', slug: 'real-estate' },
  { id: 6, name: 'E-commerce', slug: 'e-commerce' },
  { id: 7, name: 'Financial Services', slug: 'financial-services' },
  { id: 8, name: 'Education', slug: 'education' },
  { id: 9, name: 'Legal', slug: 'legal' },
  { id: 10, name: 'Technology', slug: 'technology' },
  { id: 11, name: 'Hospitality', slug: 'hospitality' },
  { id: 12, name: 'Automotive', slug: 'automotive' },
  { id: 13, name: 'Manufacturing', slug: 'manufacturing' },
  { id: 14, name: 'Recruitment', slug: 'recruitment' },
  { id: 15, name: 'Insurance', slug: 'insurance' },
  { id: 16, name: 'Non-profit', slug: 'non-profit' },
  { id: 17, name: 'Government', slug: 'government' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(hardcodedCategories);
}