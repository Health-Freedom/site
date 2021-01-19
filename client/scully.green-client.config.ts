import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "green-client",
  outDir: './dist/static',
  routes: {
    '/article/:id': {
      type: "json",
      id: {
        url: 'https://strapi.yrtestingdomainfor.info/articles',
        property: 'id'
      }
    },
    '/category/:id': {
      type: 'json',
      id: {
        url: 'https://strapi.yrtestingdomainfor.info/categories',
        property: 'id'
      }
    }
  },
  puppeteerLaunchOptions: {
    args: [
      "--disable-gpu",
      "--renderer",
      "--no-sandbox",
      "--no-service-autorun",
      "--no-experiments",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-extensions"
    ]
  }
};