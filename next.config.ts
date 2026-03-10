import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://kdtjqnxuhfsjtfayanma.supabase.co/storage/v1/object/public/cardImage/**",
      ),
    ],
  },
};

export default nextConfig;
