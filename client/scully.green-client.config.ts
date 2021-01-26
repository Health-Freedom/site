import { ScullyConfig } from '@scullyio/scully';
import { gql } from 'apollo-angular';

const articleQuery = gql`
query articleRouteData {
  articles {
    id
    title
  }
}
`;

const categoriesQuery = gql`
query categoriesRouteData {
  categories {
    id
    title
  }
}`;

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "green-client",
  outDir: './dist/static',
  routes: {
    '/article/:id': {
      type: "json",
      id: {
        url: `https://strapi.yrtestingdomainfor.info/graphql?query=${encodeURIComponent(articleQuery.loc?.source.body ?? '')}`,
        property: 'id',
        resultsHandler: (response:any) => response.data.articles
      }
    },
    '/category/:id': {
      type: 'json',
      id: {
        url: `https://strapi.yrtestingdomainfor.info/graphql?query=${encodeURIComponent(categoriesQuery.loc?.source.body ?? '')}`,
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