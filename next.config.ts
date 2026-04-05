import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // PPR is now replaced by "use cache" in Next.js 16 stable
  }
};

export default nextConfig;
