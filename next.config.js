/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com', 'tailwindui.com'],
  },
  env: {
    SHOPIFY_URL: process.env.SHOPIFY_URL,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  },
  experimental: { appDir: true },
}

module.exports = nextConfig
