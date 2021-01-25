import { NgModule, PLATFORM_ID } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-angular-link-persisted';
import { environment } from './../environments/environment';
import { isPlatformServer } from '@angular/common';

const uri = `${environment.apiURL}/graphql`;

export function createApollo(httpLink: HttpLink, platformId: any): ApolloClientOptions<any> {
  const isSSr = isPlatformServer(platformId);
  //const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(httpLink.create({uri}));

  const link = ApolloLink.from([
    createPersistedQueryLink({ useGETForHashedQueries: true }) as any,
    httpLink.create({ uri })
  ])

  return {
    ssrMode: isSSr,
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        notifyOnNetworkStatusChange: true
      }
    }
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, PLATFORM_ID]
    },
  ],
})
export class GraphQLModule { }
