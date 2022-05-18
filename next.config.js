/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/r/:recipeSlug/edit',
        destination: '/r/add',
      },
    ]
  },
};

module.exports = nextConfig;
