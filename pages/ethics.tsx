import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/layout/Layout';
import { Shield, Eye, Users, Lock, Scale, RefreshCw, MessageSquare, CheckCircle, AlertTriangle, FileText, Phone, Mail } from 'lucide-react';

function Ethics() {
  const principles = [
    {
      icon: Eye,
      title: 'We Keep It Honest',
      description: 'Transparency is the foundation of trust. Our AI agents are upfront about what they are.',
      points: [
        'AI Introduces Itself: Every agent starts calls with clear identification as an AI assistant',
        'No Pretending: We never pass our bots off as humans. If you need a person, we\'ll connect you',
        'No Hallucinations: If the answer\'s unclear, agents say "I\'m not sure—let me get a human to help"'
      ]
    },
    {
      icon: Users,
      title: 'People Come First',
      description: 'Technology should enhance human capability, not replace human judgment.',
      points: [
        'Simple Language: No jargon, no scripts. Agents talk like real humans: calm, clear, and patient',
        'Built-In Escalation: On any complex, sensitive, or urgent issue, we hand off to a qualified team member',
        'User Control: Callers can say "human" anytime to transfer instantly'
      ]
    },
    {
      icon: Lock,
      title: 'Privacy Is Non-Negotiable',
      description: 'Your data belongs to you. We protect it like our own business depends on it.',
      points: [
        'GDPR by Design: We collect only what\'s needed and delete on request',
        'Data Safety: All conversations are encrypted in transit and at rest',
        'No Tracking Tricks: No secret recordings. No data sharing with third parties without explicit permission'
      ]
    },
    {
      icon: Scale,
      title: 'Fairness & Bias Mitigation',
      description: 'Every caller deserves equal treatment regardless of accent, background, or circumstance.',
      points: [
        'Regular Testing: We scan for biased responses and uneven treatment of callers',
        'Diverse Training: Agents are trained on inclusive data—across accents, backgrounds, and needs',
        'Continuous Improvement: We update models when we find gaps or unfair patterns'
      ]
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'Meeting regulatory standards isn\'t optional—it\'s the baseline for responsible AI.',
      points: [
        'Industry Standards: We follow ICO and FCA guidelines where relevant',
        'Auditable Logs: Complete conversation records for review and accountability',
        'Configurable Boundaries: You set what agents can and cannot say in your industry'
      ]
    },
    {
      icon: RefreshCw,
      title: 'Open to Feedback',
      description: 'We\'re building for the long haul. Your feedback makes us better.',
      points: [
        'Continuous Learning: We actively seek input from clients and end users',
        'Rapid Response: Issues are addressed quickly and transparently',
        'Community Driven: Our roadmap reflects real-world needs and concerns'
      ]
    }
  ];

  const commitments = [
    {
      title: 'Transparent AI Identification',
      description: 'Every interaction begins with clear AI disclosure',
      status: 'Active'
    },
    {
      title: 'Human Oversight',
      description: 'Qualified humans available for immediate escalation',
      status: 'Active'
    },
    {
      title: 'Data Minimization',
      description: 'Collect only essential information for service delivery',
      status: 'Active'
    },
    {
      title: 'Bias Auditing',
      description: 'Regular testing across diverse user groups and scenarios',
      status: 'Ongoing'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Adherence to UK data protection and industry standards',
      status: 'Active'
    },
    {
      title: 'Open Feedback Channels',
      description: 'Multiple pathways for reporting concerns and suggestions',
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-8">
                <Shield className="h-16 w-16 text-blue-400 mr-4" />
                <div className="text-left">
                  <div className="text-blue-400 font-semibold text-lg">ETHICS & RESPONSIBLE AI</div>
                  <div className="text-gray-300 text-sm">at GoZupees</div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                We Build AI Voice Agents That Work{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  For Your People
                </span>
                , Not Against Them
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Principled development. Transparent processes. Measurable accountability at every level of our AI systems.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    const event = new CustomEvent('openLeadForm', {
                      detail: {
                        source: 'Ethics Page CTA',
                        intent: 'Report Issue'
                      }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Report an Issue
                </button>
                
                <button
                  onClick={() => {
                    const event = new CustomEvent('openLeadForm', {
                      detail: {
                        source: 'Ethics Page Contact',
                        intent: 'Contact Support'
                      }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-cyan-500/10 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Core Principles
              </h2>
              <p className="text-xl text-gray-600">
                Six foundational commitments that guide every decision we make
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {principles.map((principle, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4 mt-1">
                      <principle.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                      <p className="text-gray-600 mb-6">{principle.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {principle.points.map((point, idx) => {
                      const [title, description] = point.split(': ');
                      return (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-gray-900">{title}:</span>
                            <span className="text-gray-700 ml-1">{description}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Commitments Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Active Commitments
              </h2>
              <p className="text-xl text-gray-300">
                What we're doing right now to ensure responsible AI deployment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {commitments.map((commitment, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{commitment.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      commitment.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {commitment.status}
                    </span>
                  </div>
                  <p className="text-gray-300">{commitment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UK AI Leadership Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500/15 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-cyan-500/15 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                UK AI Thought Leadership
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Contributing to the responsible development of AI technology across the United Kingdom
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg text-center">
                <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Standards</h3>
                <p className="text-gray-600">
                  Working with UK regulatory bodies to establish best practices for AI voice technology in business environments.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg text-center">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Community Engagement</h3>
                <p className="text-gray-600">
                  Participating in AI ethics discussions and contributing to research on responsible automation in professional services.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg text-center">
                <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Protection</h3>
                <p className="text-gray-600">
                  Leading by example in GDPR compliance and privacy-first AI development for UK businesses and consumers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accountability Section */}
        <section className="py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-cyan-500/10 rounded-full blur-xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Accountability in Action
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                How we ensure our principles translate into real-world responsibility
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Continuous Monitoring</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Daily Performance Reviews</div>
                      <div className="text-gray-600 text-sm">Automated systems monitor every interaction for quality and compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Bias Detection</div>
                      <div className="text-gray-600 text-sm">Machine learning models scan for unfair treatment patterns</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">User Feedback Integration</div>
                      <div className="text-gray-600 text-sm">Real user experiences drive model improvements</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transparent Reporting</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Monthly Ethics Reviews</div>
                      <div className="text-gray-600 text-sm">Public summaries of ethical considerations and improvements</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Incident Transparency</div>
                      <div className="text-gray-600 text-sm">Clear communication when issues arise and how they're resolved</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">Open Audit Trails</div>
                      <div className="text-gray-600 text-sm">Complete records available for client and regulatory review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Continuous Improvement Through Partnership
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We welcome your insights and observations. Every interaction informs our commitment to responsible AI development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => {
                    const event = new CustomEvent('openLeadForm', {
                      detail: {
                        source: 'Ethics Contact - Report Issue',
                        intent: 'Report Issue'
                      }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Report an Issue
                </button>
                
                <button
                  onClick={() => {
                    const event = new CustomEvent('openLeadForm', {
                      detail: {
                        source: 'Ethics Contact - Support',
                        intent: 'Contact Support'
                      }
                    });
                    window.dispatchEvent(event);
                  }}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Support
                </button>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                  Ethics concerns are prioritised and reviewed by our senior leadership team within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

// Define custom layout to prevent double Layout wrapping
Ethics.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="Ethics & Responsible AI | GoZupees - Leading UK AI Voice Solutions"
      description="Our commitment to responsible AI development. Transparent, ethical voice agents that work for your people, not against them. UK AI thought leadership."
      canonical="https://gozupees.com/ethics"
      ogType="website"
    >
      {page}
    </Layout>
  );
};

export default Ethics;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600
  };
};