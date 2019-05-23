const fs = require('fs');
const path = require('path');
const globby = require('globby');
const loadJsonFile = require('load-json-file');

const dotNext = path.resolve(__dirname, './.next');
const target = path.resolve(__dirname, './.next/service-worker.js');
const staticFiles = path.resolve(__dirname, './static');

function bundles(app) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${dotNext}/static/${app.buildId}/pages`, (err, files) => {
      if (err) {
        resolve(app);
      }

      if (files) {
        const root = `/_next/static/${app.buildId}/pages`;
        app.precaches = app.precaches.concat(
          files
            .filter(file => file !== 'index.js')
            .map(file => {
              // req /_next/22321e97-8895-48db-b915-82e255f3faa8/new
              return path.join(root, file);
            })
        );
      }

      resolve(app);
    });
  });
}

function chunks(app) {
  return new Promise((resolve, reject) => {
    fs.readdir(`${dotNext}/static/chunks`, (err, files) => {
      if (err) {
        resolve(app);
      }

      if (files) {
        const root = `/_next/static/chunks`;
        app.precaches = app.precaches.concat(
          files
            .filter(file => /\.js$/.test(file))
            .map(file => {
              // req /_next/webpack/chunks/22321e97-8895-48db-b915-82e255f3faa8.js
              return path.join(root, file);
            })
        );
      }

      resolve(app);
    });
  });
}

function app() {
  const app = {
    buildId: fs.readFileSync(`${dotNext}/BUILD_ID`, 'utf8'),
    precaches: []
  };

  return loadJsonFile(`${dotNext}/build-stats.json`).then(stats => {
    Object.keys(stats).map(src => {
      console.log(`/_next/${stats[src].hash}/${src}`);
      //app.precaches.push(`/_next/${stats[src].hash}/${src}`)
    });

    return app;
  });
}

const swSnippet = precache =>
  `importScripts('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/workbox-sw.prod.v2.1.0.js')
const workboxSW = new WorkboxSW({clientsClaim: true})
// set precahe listed item
workboxSW.precache(${precache})
// cache very first page by sw
workboxSW.router.registerRoute(
	'/',
	workboxSW.strategies.staleWhileRevalidate()
)
workboxSW.router.registerRoute('https://gestorbeneficis.fanoc.org/wp-json/(.*)',
workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'jsonwordpress',
  cacheExpiration: {
	maxEntries: 100,
	maxAgeSeconds: 7 * 24 * 60 * 60
  },
  cacheableResponse: {statuses: [0, 200]}
})
)
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
workboxSW.strategies.cacheFirst({
  cacheName: 'images-cache',
  cacheExpiration: {
	maxEntries: 50
  }
})
)
workboxSW.router.registerRoute(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,
workboxSW.strategies.cacheFirst({
  cacheName: 'pics-cache',
  cacheExpiration: {
	maxEntries: 100
  }
})
)
workboxSW.router.registerRoute(/\.(?:css)$/,
workboxSW.strategies.cacheFirst({
  cacheName: 'css-cache',
  cacheExpiration: {
	maxEntries: 50
  }
})
)
workboxSW.router.registerRoute(/\.(?:js)$/,
workboxSW.strategies.cacheFirst({
  cacheName: 'js-cache',
  cacheExpiration: {
	maxEntries: 50
  }
})
)
`;

app()
  .then(chunks)
  .then(bundles)
  .then(app => {
    fs.writeFileSync(target, swSnippet(JSON.stringify(app.precaches, null, 2)), 'utf8');
  });
