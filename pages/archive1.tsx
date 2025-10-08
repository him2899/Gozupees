import React from 'react';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';

// Dynamic imports with ssr: false for components with client-side effects
const HeroSection = dynamic(() => import('../components/home/HeroSection'), { ssr: false });
const AIEmployeeSlider = dynamic(() => import('../components/home/AIEmployeeSlider'), { ssr: false });
const FeatureGrid = dynamic(() => import('../components/home/FeatureGrid'), { ssr: false });
const TestimonialCarousel = dynamic(() => import('../components/home/TestimonialCarousel'), { ssr: false });
const CaseStudiesHighlight = dynamic(() => import('../components/home/CaseStudiesHighlight'), { ssr: false });
const InsightsSection = dynamic(() => import('../components/home/InsightsSection'), { ssr: false });
const CtaSection = dynamic(() => import('../components/home/CtaSection'), { ssr: false });
const VoiceDemoGalleryIndustryFirst = dynamic(() => import('../components/home/VoiceDemoGalleryIndustryFirst'), { ssr: false });
const SmoothCarousel = dynamic(() => import('../components/home/SmoothCarousel'), { ssr: false });
const LiveVoiceDemoSection = dynamic(() => import('../components/home/LiveVoiceDemoSection'), { ssr: false });
const StatsSection = dynamic(() => import('../components/home/StatsSection'), { ssr: false });
const SecuritySection = dynamic(() => import('../components/home/IntegrationsSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/home/TestimonialsSection'), { ssr: false });
const CustomerLogosSection = dynamic(() => import('../components/home/CustomerLogosSection'), { ssr: false });
const BlogSection = dynamic(() => import('../components/home/BlogSection'), { ssr: false });

interface HomeProps {
  currentDate: string;
}

function Home({ currentDate }: HomeProps) {
  return (
    <main className="min-h-screen overflow-hidden">
        {/* Hero Section with AI Employees */}
        <HeroSection currentDate={currentDate} />
        
        {/* Customer Logos Section */}
        <CustomerLogosSection />
        
        {/* Live Voice Demo Section - Section 2 */}
        <LiveVoiceDemoSection />
        
        {/* Stats Section - Real Results */}
        <StatsSection />
        
        {/* Industry-First Voice Demo Gallery Section - AI Agents Across Industries */}
        <VoiceDemoGalleryIndustryFirst />
        
        {/* Security Section - Enterprise-Grade Security & AI Governance */}
        <SecuritySection />
        
        {/* Testimonials Section - Client Success Stories */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CtaSection />
        
        {/* Blog Section - AI Insights & Resources */}
        <BlogSection />
      </main>
  );
}

// Define custom layout to prevent double Layout wrapping
Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="GoZupees - AI Voice Agents for Sales & Marketing | Transform Customer Communication"
      description="Deploy specialized AI voice agents that handle sales calls, lead qualification, and customer support 24/7. Increase conversions and reduce costs with GoZupees intelligent voice automation."
      canonical="https://gozupees.com"
      ogImage="https://gozupees.com/og-image.jpg"
      ogType="website"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GoZupees',
        url: 'https://gozupees.com',
        logo: 'https://gozupees.com/logo.png',
        description: 'AI voice agents platform for sales and marketing automation',
        sameAs: [
          'https://linkedin.com/company/gozupees',
          'https://twitter.com/gozupees'
        ]
      }}
    >
      {page}
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // Get current date formatted as string
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    props: {
      currentDate
    },
    // Revalidate the page every day to keep the date current
    revalidate: 86400,
  };
};