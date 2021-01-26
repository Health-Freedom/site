import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { environment } from './../environments/environment';

const uri = `${environment.apiURL}/graphql`;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const link = ApolloLink.from([
    createPersistedQueryLink({ useGETForHashedQueries: true }) as any,
    createHttpLink({ uri })
  ]);

  const persisted = createPersistedQueryLink();
  const http = httpLink.create({
    uri,
  });

  const angularLink = persisted.concat(http as any);

  return {
    link: link,
    cache: new InMemoryCache()
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
