// next.config.js
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all external images
      },
    ],
  },
};
