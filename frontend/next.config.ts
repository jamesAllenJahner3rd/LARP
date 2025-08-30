import type { NextConfig } from "next/types"; //had to add '/types'
import path from "path"; //needs to Point to the right package.json because the project has a multiple package.json's
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Wildcard to match all paths
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname, ".."), // path needed for this line
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3001/api/:path*",
  //     },
  //   ];
  // },
};
export default nextConfig; // On this version a named object was needed: nextConfig: NextConfig = {
