import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { environment } from './../environments/environment';


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = ApolloLink.from([
    createPersistedQueryLink({ useGETForHashedQueries: true }) as any,
    createHttpLink({ uri: environment.apiURL })
  ]);

  const persisted = createPersistedQueryLink();
  const http = httpLink.create({
    uri: environment.apiURL,
  });

  const angularLink = persisted.concat(http as any);

  return {
    link: link,
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
      deps: [HttpLink]
    },
  ],
})
export class GraphQLModule { }
