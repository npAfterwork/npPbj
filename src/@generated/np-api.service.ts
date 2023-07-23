import {GQL} from './np-types';
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type AlbumDetailFragment = { __typename: 'AlbumQL', albumType: GQL.AlbumType, name: string, artist: { __typename: 'ArtistQL', id: string } };

export type AlbumQueryVariables = GQL.Exact<{
  id: GQL.Scalars['ID'];
}>;


export type AlbumQueryResult = { __typename: 'Query', album: { __typename: 'AlbumQL', name: string, id: string, artist: { __typename: 'ArtistQL', name: string } } };

export type AlbumsQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type AlbumsQueryResult = { __typename: 'Query', albums: { __typename: 'AlbumPageQL', total: number, items: Array<{ __typename: 'AlbumQL', name: string, artist: { __typename: 'ArtistQL', name: string } }> } };

export const AlbumDetailFragmentDoc = gql`
    fragment AlbumDetail on AlbumQL {
  albumType
  artist {
    id
  }
  name
}
    `;
export const AlbumDocument = gql`
    query album($id: ID!) {
  album(id: $id) {
    name
    id
    artist {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AlbumGQL extends Apollo.Query<AlbumQueryResult, AlbumQueryVariables> {
    document = AlbumDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AlbumsDocument = gql`
    query albums {
  albums {
    items {
      name
      artist {
        name
      }
    }
    total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AlbumsGQL extends Apollo.Query<AlbumsQueryResult, AlbumsQueryVariables> {
    document = AlbumsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V>
    extends Omit<ApolloCore.WatchQueryOptions<V>, 'query' | 'variables'> {}
    
  interface QueryOptionsAlone<V>
    extends Omit<ApolloCore.QueryOptions<V>, 'query' | 'variables'> {}
    
  interface MutationOptionsAlone<T, V>
    extends Omit<ApolloCore.MutationOptions<T, V>, 'mutation' | 'variables'> {}
    
  interface SubscriptionOptionsAlone<V>
    extends Omit<ApolloCore.SubscriptionOptions<V>, 'query' | 'variables'> {}

  @Injectable({ providedIn: 'root' })
  export class NPApiService {
    constructor(
      private albumGql: AlbumGQL,
      private albumsGql: AlbumsGQL
    ) {}
      
    album(variables: AlbumQueryVariables, options?: QueryOptionsAlone<AlbumQueryVariables>) {
      return this.albumGql.fetch(variables, options)
    }
    
    albumWatch(variables: AlbumQueryVariables, options?: WatchQueryOptionsAlone<AlbumQueryVariables>) {
      return this.albumGql.watch(variables, options)
    }
    
    albums(variables?: AlbumsQueryVariables, options?: QueryOptionsAlone<AlbumsQueryVariables>) {
      return this.albumsGql.fetch(variables, options)
    }
    
    albumsWatch(variables?: AlbumsQueryVariables, options?: WatchQueryOptionsAlone<AlbumsQueryVariables>) {
      return this.albumsGql.watch(variables, options)
    }
  }