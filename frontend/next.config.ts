import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',               // http or https
        hostname: 'media.istockphoto.com', // domain
        port: '',                         // optional, leave empty for default
        pathname: '/**',                  // pattern for allowed paths
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Add this new object
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
