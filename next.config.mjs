/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
    // Remove the missingSuspenseWithCSRBailout option that's causing deployment issues
    experimental: {
      // Only keep valid experimental options
    }
  };
  
  export default nextConfig;
  
  