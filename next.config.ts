import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
