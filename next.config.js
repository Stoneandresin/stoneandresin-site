/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure both `/about` and `/about/` work.
  trailingSlash: true,
  experimental: { 
    typedRoutes: true,
    // Exclude public directory from serverless function bundles to reduce function size
    outputFileTracingExcludes: {
      '*': [
        './public/**/*',
      ],
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
      { protocol: 'https', hostname: 'vuba-stone.com', pathname: '/**' },
      { protocol: 'https', hostname: 'm.bbb.org', pathname: '/**' }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.tidio.co https://*.tidio.co",
              "frame-src 'self' https://*.tidio.co",
              "connect-src 'self' https://*.tidio.co wss://*.tidio.co",
              "img-src 'self' data: https: https://*.tidio.co",
              "style-src 'self' 'unsafe-inline' https://*.tidio.co",
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
