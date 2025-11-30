// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: **//"nyc.cloud.appwrite.io",
        // Optional: you can add a pathname if you want to be more specific
        // pathname: '/v1/storage/buckets/**',
      },
    ],
  },
};
export default nextConfig;
