/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/edit/:recipeSlug',
        destination: '/add',
      },
    ]
  },
};

module.exports = nextConfig;
