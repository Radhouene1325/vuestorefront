import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ['@storefront-ui/react'],

  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.brave.com", // Allows all subdomains of brave.com
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*',
      },

    ]
  }

  // env: {
  //   MAGENTO_API_URL: process.env.VSF_MAGENTO_GRAPHQL_URL || 'http://localhost:8181/magento',
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/magento/:path*', // Proxy all requests starting with /api/magento/
  //       destination: `${process.env.VSF_MAGENTO_GRAPHQL_URL}`, // Rewrite to Magento backend
  //     },
  //   ];
  // },
};

export default nextConfig;
