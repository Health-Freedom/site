import { NgModule, PLATFORM_ID } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { environment } from './../environments/environment';
import { isPlatformServer } from '@angular/common';

const uri = `${environment.apiURL}/graphql`;

export function createApollo(angularLink: HttpLink, platformId:any): ApolloClientOptions<any> {
  const isSSr = isPlatformServer(platformId);

  return {
    ssrMode: isSSr,
    link: isSSr ? angularLink.create({uri}) : ApolloLink.from([
      createPersistedQueryLink({ useGETForHashedQueries: true }) as any,
      createHttpLink({ uri })
    ]),
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
