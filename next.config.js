/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["googleapis.com", 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
};

module.exports = nextConfig;
