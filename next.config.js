/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate pages with a trailing slash so that both `/about` and `/about/` work.
  trailingSlash: true,
  experimental: {
    typedRoutes: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vuba-stone.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
=======
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
      { protocol: 'https', hostname: 'vuba-stone.com', pathname: '/**' },
>>>>>>> origin/main
    ],
  },
};

module.exports = nextConfig;
