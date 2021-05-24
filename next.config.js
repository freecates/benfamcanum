const withOffline = moduleExists('next-offline') ? require('next-offline') : {};

const nextConfig = {
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: new RegExp('^https://maps.(?:googleapis|gstatic).com/(.*)'),
        handler: 'NetworkOnly'
      },
      {
        urlPattern: /^https?.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'https-calls',
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  target: 'serverless',
  future: {
    webpack5: true,
  },
};

module.exports = moduleExists('next-offline') ? withOffline(nextConfig) : nextConfig;

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}
