import type { NextApiRequest, NextApiResponse } from 'next';

// Hardcoded testimonials for performance
const hardcodedTestimonials = [
  {
    id: 1,
    clientName: "Sarah Mitchell",
    company: "TechFlow Solutions",
    position: "VP of Sales",
    testimonial: "Our GoZupees sales agent increased our lead qualification rate by 300%. It handles initial prospect calls flawlessly and books qualified meetings automatically. Game-changer for our sales team.",
    rating: 5,
    industry: "B2B SaaS",
    useCase: "Inbound Sales Qualification",
    featured: true,
    order: 1,
    createdAt: new Date('2025-01-15T10:30:00Z')
  },
  {
    id: 2,
    clientName: "Marcus Rodriguez",
    company: "Premier Real Estate Group",
    position: "Managing Broker",
    testimonial: "The AI agent handles property inquiries 24/7, scheduling showings and capturing lead details. Our response time went from hours to seconds, and we're closing 40% more deals.",
    rating: 5,
    industry: "Real Estate",
    useCase: "Lead Qualification",
    featured: true,
    order: 2,
    createdAt: new Date('2025-01-20T14:15:00Z')
  },
  {
    id: 3,
    clientName: "Dr. Jennifer Chen",
    company: "Wellness First Clinic",
    position: "Practice Manager",
    testimonial: "GoZupees appointment booking agent eliminated phone tag completely. Patients love the instant scheduling, and we reduced no-shows by 60% with automated reminders.",
    rating: 5,
    industry: "Healthcare",
    useCase: "Appointment Scheduling",
    featured: true,
    order: 3,
    createdAt: new Date('2025-01-22T09:45:00Z')
  },
  {
    id: 4,
    clientName: "David Thompson",
    company: "CloudTech Industries",
    position: "Head of Customer Success",
    testimonial: "Our trial conversion agent follows up with prospects at the perfect moment. It's increased our trial-to-paid conversion rate by 85% while saving our team 20 hours per week.",
    rating: 5,
    industry: "B2B SaaS",
    useCase: "Trial Conversion",
    featured: true,
    order: 4,
    createdAt: new Date('2025-01-25T16:20:00Z')
  }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Retrieved', hardcodedTestimonials.length, 'testimonials from database');
      return res.status(200).json(hardcodedTestimonials);
    } catch (error) {
      console.error('Error returning testimonials:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch testimonials',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}