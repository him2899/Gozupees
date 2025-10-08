import { GetStaticProps } from 'next';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const upcomingEvents = [
    {
      title: 'AI Summit London 2025',
      date: 'March 15–16, 2025',
      location: 'London, UK',
      description:
        'Join GoZupees at the world’s leading AI conference. Discover how enterprises are building AI-powered customer and employee experiences.',
    },
    {
      title: 'Enterprise AI Connect – Virtual',
      date: 'May 10, 2025',
      location: 'Online',
      description:
        'An exclusive webinar for enterprise leaders exploring practical AI transformation use cases and live demos from the GoZupees team.',
    },
  ];

  const pastEvents = [
    {
      title: 'AI Tech Expo 2024',
      date: 'November 2024',
      location: 'Bengaluru, India',
      description:
        'GoZupees showcased the power of AI voice agents and knowledge systems, with over 200 enterprise visitors engaging with our demo.',
    },
    {
      title: 'Future of Work 2024',
      date: 'June 2024',
      location: 'Dubai, UAE',
      description:
        'Panel discussion on how digital employees are reshaping enterprise workflows — featuring our CEO and global industry experts.',
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setFormSubmitted(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 text-gray-900 py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoZupees</span> at Our Events
          </motion.h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We’re bringing the AI revolution to enterprises worldwide. Join us at industry events, webinars, and summits to see our products in action and connect with our team.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Upcoming Events</h2>
          <div className="max-w-5xl mx-auto grid gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 gap-4 mb-3">
                      <CalendarDays className="w-5 h-5" />
                      <span>{event.date}</span>
                      <MapPin className="w-5 h-5 ml-3" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-6 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Past Events</h2>
          <div className="max-w-5xl mx-auto grid gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-600 gap-4 mb-3">
                    <CalendarDays className="w-5 h-5" />
                    <span>{event.date}</span>
                    <MapPin className="w-5 h-5 ml-3" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full relative text-gray-900"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    Register for Event
                  </h2>
                  <input
                    name="fullName"
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <input
                    name="company"
                    placeholder="Company / Organization"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Message or specific queries"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none text-gray-900 placeholder-gray-500"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
                  <p className="text-gray-700">Your registration has been submitted successfully.</p>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              )}
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
