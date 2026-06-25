import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.5.252'],
  images: {
    minimumCacheTTL: 60 * 60 * 24, // 1 giorno
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kisskissnapoli.it',
      },
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
      }
    ],
  },
};

export default nextConfig;
