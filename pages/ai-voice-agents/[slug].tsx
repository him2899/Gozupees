import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

interface VoiceAgent {
  slug: string;
  title: string;
  description: string;
  features: string[];
}

const voiceAgents: VoiceAgent[] = [
  {
    slug: 'customer-service',
    title: 'Customer Service Agent',
    description:
      'An intelligent AI voice agent that handles customer service inquiries 24/7, resolving issues and improving satisfaction.',
    features: [
      'Answers FAQs and handles complaints automatically',
      'Integrates with CRMs like HubSpot or Salesforce',
      'Escalates to human agents when needed',
    ],
  },
  {
    slug: 'receptionist',
    title: 'AI Receptionist',
    description:
      'A friendly AI receptionist that manages inbound calls, appointments, and lead capture for businesses.',
    features: [
      'Handles booking and appointment scheduling',
      'Transfers calls to the right departments',
      'Collects caller information and sends instant alerts',
    ],
  },
  {
    slug: 'inbound-calls',
    title: 'Inbound Calls Agent',
    description:
      'Automatically answers and routes inbound calls with human-like accuracy and natural conversation flow.',
    features: [
      'Understands caller intent',
      'Routes to correct departments',
      'Provides real-time updates and call summaries',
    ],
  },
  {
    slug: 'sales-qualification',
    title: 'Sales Qualification Agent',
    description:
      'Qualifies leads through intelligent conversations and automatically updates your CRM.',
    features: [
      'Asks dynamic qualifying questions',
      'Identifies sales-ready leads instantly',
      'Notifies your sales team in real time',
    ],
  },
];

export default function VoiceAgentPage({ agent }: { agent: VoiceAgent }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="text-center py-20 text-gray-700">Loading...</div>;
  }

  if (!agent) {
    return (
      <div className="text-center py-20 text-gray-700">
        <h2 className="text-3xl font-bold mb-4">404 - Agent Not Found</h2>
        <p className="text-gray-500">
          The requested AI Voice Agent does not exist or has been moved.
        </p>
      </div>
    );
  }

  return (
    <Layout
      title={`${agent.title} | GoZupees`}
      description={agent.description}
      canonical={`https://gozupees.com/ai-voice-agents/${agent.slug}`}
    >
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{agent.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{agent.description}</p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
          <ul className="space-y-3 text-gray-700">
            {agent.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 font-bold mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <button
              onClick={() => router.push('/contact')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = voiceAgents.map((agent) => ({
    params: { slug: agent.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const agent = voiceAgents.find((a) => a.slug === slug) || null;

  return {
    props: { agent },
    revalidate: 60, // revalidate every minute
  };
};
