/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['**'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all domains dynamically
      },
    ],
  },
};

module.exports = nextConfig;
