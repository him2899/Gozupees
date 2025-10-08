import Link from 'next/link';
import { ArrowRight, Bot } from 'lucide-react';

export default function AIVoiceAgentsIndex() {
  const agents = [
    {
      slug: 'customer-service',
      title: 'Customer Service Agent',
      description: 'Handles customer queries, complaints, and FAQs 24/7 with natural conversations.',
    },
    {
      slug: 'receptionist',
      title: 'AI Receptionist',
      description: 'Manages inbound calls, appointments, and lead capture for businesses.',
    },
    {
      slug: 'inbound-calls',
      title: 'Inbound Calls Agent',
      description: 'Automatically handles inbound inquiries and routes calls to the right department.',
    },
    {
      slug: 'sales-qualification',
      title: 'Sales Qualification Agent',
      description: 'Qualifies and scores inbound leads using smart conversation flows.',
    },
    {
      slug: 'lead-validation',
      title: 'Lead Validation Agent',
      description: 'Validates lead data and updates CRM automatically with verified information.',
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our AI Voice Agents
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our intelligent AI Voice Agents designed to automate customer support, lead management, scheduling, and more — all tailored for your business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {agents.map((agent) => (
            <Link
              key={agent.slug}
              href={`/ai-voice-agents/${agent.slug}`}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-lg shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {agent.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {agent.description}
              </p>
              <div className="text-blue-600 flex items-center font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
