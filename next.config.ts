import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.5.252'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kisskissnapoli.it',
      },
    ],
  },
};

export default nextConfig;
