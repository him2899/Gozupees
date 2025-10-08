import { GetStaticProps } from "next";
import { useState } from "react";
import { Briefcase, Users, Rocket, Heart, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Careers() {
  const [showForm, setShowForm] = useState(false);

  const openings = [
    {
      title: "AI Product Manager",
      location: "London, UK",
      type: "Full-time",
      description:
        "Lead cross-functional teams to design, build, and launch AI-driven enterprise solutions for global clients.",
    },
    {
      title: "Full Stack Engineer",
      location: "London, UK",
      type: "Full-time",
      description:
        "Work with cutting-edge frameworks to build highly scalable web apps that power our AI platform.",
    },
    {
      title: "Marketing & Growth Specialist",
      location: "London, UK",
      type: "Full-time",
      description:
        "Drive brand awareness, lead generation, and content campaigns across digital platforms.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900 py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AI Revolution
            </span>{" "}
            at GoZupees
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We’re building the world’s most advanced AI workforce — digital employees that power
            sales, marketing, and customer service. Come shape the future with us.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Life at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              GoZupees
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
              <Users className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Collaborative Environment</h3>
              <p className="text-gray-700">
                Work with a diverse, global team of innovators shaping the AI future together.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
              <Rocket className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Cutting-Edge Projects</h3>
              <p className="text-gray-700">
                Build products that redefine enterprise efficiency and customer engagement.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
              <Heart className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Work That Matters</h3>
              <p className="text-gray-700">
                Make an impact at scale — your code, strategy, or design could touch millions of
                users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Open{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Positions
            </span>
          </h2>

          <div className="max-w-5xl mx-auto grid gap-8">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all text-left"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="text-sm text-gray-600 flex gap-6">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 text-gray-900 py-20 text-center">
        <div className="container mx-auto px-4">
          <Briefcase className="w-12 h-12 mx-auto text-blue-600 mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We’re always looking for passionate innovators, creators, and builders. Reach out and
            tell us how you can help shape GoZupees.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-3 rounded-lg transition-all flex items-center justify-center mx-auto gap-2"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Modal Form (with Zoho iframe) */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl w-full relative text-gray-900 shadow-2xl"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Submit Your Application
              </h2>

              {/* Zoho Job Application Form */}
              <iframe
                aria-label="Job Application Form"
                src="https://forms.zohopublic.in/himanshumawri2899gm1/form/JobApplicationForm/formperma/jL0DyVNYhUkXALwX_3T0YH534Qke9aTHKpa_fzpFkGc"
                title="Zoho Job Application Form"
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-xl"
                style={{
                  border: "none",
                  overflow: "hidden",
                }}
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
