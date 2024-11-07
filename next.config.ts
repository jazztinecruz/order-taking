import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "nypvfcuq1mism4yg.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
