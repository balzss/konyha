/** @type {import('next').NextConfig} */
const nextConfig = {
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
