import React from "react";
import Layout from "../components/layout/Layout";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-10 md:py-16 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center text-white mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Have questions or want to collaborate? Fill out the form below and our team will reach out shortly.
          </p>
        </div>

        {/* Zoho Form */}
        <div className="max-w-3xl mx-auto bg-black/60 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <iframe
            aria-label="Contact Us"
            src="https://forms.zohopublic.in/himanshumawri2899gm1/form/ContactUs/formperma/WNqtt5pyaZxff0g3toL--P1IHAoYsrMDdcskMbfZZfk"
            title="Zoho Contact Form"
            width="100%"
            height="750"
            frameBorder="0"
            className="rounded-3xl"
            style={{
              border: "none",
              overflow: "hidden",
            }}
          ></iframe>
        </div>

        {/* Optional footer */}
        <div className="text-center mt-8 text-white/80 text-sm">
          <p>
            Prefer to reach out directly?{" "}
            <a
              href="mailto:sales@gozupees.com"
              className="text-white font-medium underline hover:text-gray-200"
            >
              sales@gozupees.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout
      title="Contact - GoZupees"
      description="Get in touch with our AI transformation experts at GoZupees. Fill out the form to discuss AI automation, voice agents, and digital solutions."
      canonical="https://gozupees.com/contact"
      ogImage="https://gozupees.com/contact-og-image.jpg"
      ogType="website"
    >
      {page}
    </Layout>
  );
};
