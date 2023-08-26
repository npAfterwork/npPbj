import {HttpErrorResponse} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {ApolloClientOptions, ApolloLink, createHttpLink, InMemoryCache, split} from '@apollo/client/core';
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {createClient} from "graphql-ws";
import {AuthService} from "src/app/services/auth/auth.service";
import {environment} from "../environments/environment";

const uri = 'http://localhost:4040/graphql'; // <-- add the URL of the GraphQL server here
const subscriptionUrl = 'ws://localhost:4040/subscriptions';
const errorLink = onError(({graphQLErrors, networkError, response}) => {
  // React only on graphql errors
  if (graphQLErrors && graphQLErrors.length > 0) {
    if (
      (graphQLErrors[0] as any)?.statusCode >= 400 &&
      (graphQLErrors[0] as any)?.statusCode < 500
    ) {
      // handle client side error
      console.error(`[Client side error]: ${graphQLErrors[0].message}`);
    } else {
      // handle server side error
      console.error(`[Server side error]: ${graphQLErrors[0].message}`);
    }
  }
  if (networkError) {
    // handle network error
    let error;
    try {
      error = (networkError as HttpErrorResponse).error.errors[0].message;
    } catch (e) {
      error = e;
    }
    console.error(`[Network error]: ${networkError.message}`, error);
  }
});

export function createApollo(httpLink: HttpLink, authService: AuthService): ApolloClientOptions<any> {
  const cache = new InMemoryCache({});
  // create http
  const http = createHttpLink({uri, credentials: 'include'})
  // const http = httpLink.create({uri, withCredentials: true});
  const wsLink = new GraphQLWsLink(createClient({
    url: subscriptionUrl,
  }));
  //
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    http
  );

  const basicContext = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        // Authorization: "Bearer " + authService.jwt(),
        //'Content-Type': 'application/json'
        // authorization: headers?.authorization
      },
    };
  });

  return {
    connectToDevTools: !environment.production,
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from([basicContext, errorLink, splitLink]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  imports: [ApolloModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {
}
