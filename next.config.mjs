// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io",
        // Optional: add pathname if you want to be more specific
        // pathname: "/v1/storage/buckets/**",
      },
    ],
  },
  // turbo: {
  //   cache: {
  //     // Directory for Turbopack cache storage
  //     path: ".next/cache",
  //   },
  // },
};

export default nextConfig;
