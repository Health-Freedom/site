import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "green-client",
  outDir: './dist/static',
  routes: {
    '/article/:id': {
      type: "json",
      id: {
        url: 'https://strapi.yrtestingdomainfor.info/graphql?query=%7B%0A%20%20articles%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20description%3Asummary%0A%20%20%7D%0A%7D',
        property: 'id',
        resultsHandler: (response:any) => response.data.articles
      }
    },
    '/category/:id': {
      type: 'json',
      id: {
        url: 'https://strapi.yrtestingdomainfor.info/graphql?query=%7B%0A%20%20categories%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20description%0A%20%20%7D%0A%7D',
        property: 'id',
        resultsHandler: (response:any) => response.data.categories
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