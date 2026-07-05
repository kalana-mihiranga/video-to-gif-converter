import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  async headers() {
    return [
      {
        // Cross-origin isolation headers. Needed if you switch to the
        // multi-threaded FFmpeg core (@ffmpeg/core-mt). Safe to keep even
        // with the single-threaded core used by default in this project.
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ],
      },
    ];
  },
};

export default nextConfig;
