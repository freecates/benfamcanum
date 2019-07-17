const sitemap = require('nextjs-sitemap-generator');

sitemap({
  baseUrl: 'https://beneficis.fanoc.org',
  ignoredPaths: ['admin'],
  pagesDirectory: 'pages',
  targetDirectory: 'static/'
});
