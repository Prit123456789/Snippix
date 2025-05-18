import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: "/owner",
        destination: "https://github.com/aayushbharti",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
