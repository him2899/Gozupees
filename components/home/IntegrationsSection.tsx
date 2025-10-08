'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, FileCheck, CreditCard, Search } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Agents Stay Within Guardrails - No Hallucinations',
    description: 'GoZupees AI Agents are grounded in structured knowledge bases and strict logic rules - no off-brand or rogue responses.'
  },
  {
    icon: FileCheck,
    title: 'SOC 2, HIPAA, GDPR Compliant',
    description: 'Compliant with global data privacy standards to protect sensitive user info and ensure lawful AI operations.'
  },
  {
    icon: Database,
    title: 'Native CRM, Calendar & Phone Integrations (200+)',
    description: 'Connect securely to your existing stack - from Salesforce and Outlook to SIP trunking and CCaaS platforms.'
  },
  {
    icon: Lock,
    title: 'Zero Data Leakage – All Managed In-House',
    description: 'All conversations, prompts, and metadata are encrypted and processed within GoZupees infrastructure. No third-party relay.'
  },
  {
    icon: CreditCard,
    title: 'PCI DSS Secure Payment Flows',
    description: 'Supports payment-triggered AI actions with encryption and cardholder data protections as per PCI standards.'
  },
  {
    icon: Search,
    title: 'Continuous Testing & Penetration Audits',
    description: 'Our infrastructure undergoes regular vulnerability scans, penetration tests, and performance QA.'
  }
];

export default function SecuritySection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-black py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 tracking-wider uppercase">
              Security
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Enterprise-Grade Security & AI Governance
            </h2>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Robust infrastructure, real-time monitoring, and full compliance - so your AI agents can scale securely, with trust baked in.
            </p>
          </motion.div>

          {/* Security Features Grid - 2 rows of 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-6 py-6 hover:bg-gray-800/70 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}