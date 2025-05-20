import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['surgeon.whdev.in','placehold.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
