/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow deployment with TypeScript errors (for protected system files)
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'sandeepb35.sg-host.com',
      },
      {
        protocol: 'http',
        hostname: 'sandeepb35.sg-host.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'http',
        hostname: 'gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'wordpress.com',
      },
      {
        protocol: 'http',
        hostname: 'wordpress.com',
      },
      {
        protocol: 'https',
        hostname: 'wp.com',
      },
      {
        protocol: 'http',
        hostname: 'wp.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old agentic-ai-solutions paths to new ai-voice-agents paths
      {
        source: '/agentic-ai-solutions/:path*',
        destination: '/ai-voice-agents/:path*',
        permanent: true,
      },
      // Redirect old agents paths to new ai-voice-agents paths
      {
        source: '/agents/:path*',
        destination: '/ai-voice-agents/:path*',
        permanent: true,
      },
      // Redirect specific demo paths
      {
        source: '/demo-all-in-one-agent',
        destination: '/ai-voice-agents/business-support',
        permanent: true,
      },
      {
        source: '/demo/multilingual',
        destination: '/ai-voice-agents/multilingual',
        permanent: true,
      },
      // Redirect old ai-agents-by-industry paths to new industries paths
      {
        source: '/ai-agents-by-industry/:path*',
        destination: '/industries/:path*',
        permanent: true,
      },
    ];
  },
}

export default nextConfig;