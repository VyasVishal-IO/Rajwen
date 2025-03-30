/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['**'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add this to bypass static optimization errors
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;