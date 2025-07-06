import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { Readable } from 'stream';
import cron from 'node-cron';

// Define routes with their specific changefreq and priority
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact-us',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/about-us',
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },
  {
    url: '/new-post',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/all-properties/',
    changefreq: 'daily',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/subscriptions',
    changefreq: 'weekly',
    priority: 0.6,
    lastmod: new Date().toISOString()
  },
  {
    url: '/terms-and-conditions',
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: new Date().toISOString()
  },
  {
    url: '/cancellation-policy',
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: new Date().toISOString()
  }
];

// Function to update lastmod based on changefreq
function updateLastMod() {
  const now = new Date();
  routes.forEach(route => {
    switch (route.changefreq) {
      case 'daily':
        route.lastmod = now.toISOString();
        break;
      case 'weekly':
        if (now.getDay() === 0) { // Update on Sundays
          route.lastmod = now.toISOString();
        }
        break;
      case 'yearly':
        if (now.getMonth() === 0 && now.getDate() === 1) { // Update on January 1st
          route.lastmod = now.toISOString();
        }
        break;
      default:
        break;
    }
  });
}

// Schedule cron jobs
cron.schedule('0 0 * * *', () => { // Daily at midnight
  updateLastMod();
});

cron.schedule('0 0 * * 0', () => { // Weekly on Sundays at midnight
  updateLastMod();
});

cron.schedule('0 0 1 1 *', () => { // Yearly on January 1st at midnight
  updateLastMod();
});

export async function generateSitemapXML() {
  const stream = new SitemapStream({ hostname: 'https://thehomedaze.com' });
  
  return streamToPromise(
    Readable.from(routes).pipe(stream)
  ).then(data => data.toString());
}

export async function generateSitemapGzipped() {
  const stream = new SitemapStream({ hostname: 'https://thehomedaze.com' });
  
  return streamToPromise(
    Readable.from(routes)
      .pipe(stream)
      .pipe(createGzip())
  );
}

export default generateSitemapXML;