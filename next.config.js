/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to enable middleware support
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;