import {Injectable} from '@angular/core';
import * as ApolloCore from '@apollo/client/core';
import * as Apollo from 'apollo-angular';
import {gql} from 'apollo-angular';
import {GQL} from './np-types';

export type AlbumDetailFragment = { __typename: 'AlbumQL', id: string, name: string, albumType: GQL.AlbumType, artist: { __typename: 'ArtistQL', id: string } };

export type AlbumQueryVariables = GQL.Exact<{
  id: GQL.Scalars['ID'];
}>;


export type AlbumQueryResult = { __typename: 'Query', album: { __typename: 'AlbumQL', name: string, id: string, artist: { __typename: 'ArtistQL', name: string } } };

export type AlbumsQueryVariables = GQL.Exact<{
  skip: GQL.Scalars['Int'];
  take?: GQL.InputMaybe<GQL.Scalars['Int']>;
}>;


export type AlbumsQueryResult = { __typename: 'Query', albums: { __typename: 'AlbumPageQL', total: number, items: Array<{ __typename: 'AlbumQL', id: string, name: string, albumType: GQL.AlbumType, artist: { __typename: 'ArtistQL', id: string } }> } };

export type ArtistInfoFragment = { __typename: 'ArtistQL', id: string, name: string, genresCount: number };

export type ArtistDetailFragment = { __typename: 'ArtistQL', id: string, name: string, genresCount: number, albums: Array<{ __typename: 'AlbumQL', name: string }> };

export type ArtistQueryVariables = GQL.Exact<{
  id: GQL.Scalars['ID'];
}>;


export type ArtistQueryResult = { __typename: 'Query', artist: { __typename: 'ArtistQL', id: string, name: string, genresCount: number, albums: Array<{ __typename: 'AlbumQL', name: string }> } };

export type ArtistsQueryVariables = GQL.Exact<{
  skip: GQL.Scalars['Int'];
  take?: GQL.InputMaybe<GQL.Scalars['Int']>;
}>;


export type ArtistsQueryResult = { __typename: 'Query', artists: { __typename: 'ArtistPageQL', total: number, items: Array<{ __typename: 'ArtistQL', id: string, name: string, genresCount: number, albums: Array<{ __typename: 'AlbumQL', name: string }> }> } };

export type ArtistsInfoQueryVariables = GQL.Exact<{
  skip: GQL.Scalars['Int'];
  take?: GQL.InputMaybe<GQL.Scalars['Int']>;
}>;


export type ArtistsInfoQueryResult = { __typename: 'Query', artists: { __typename: 'ArtistPageQL', total: number, items: Array<{ __typename: 'ArtistQL', id: string, name: string, genresCount: number }> } };

export type BandsQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type BandsQueryResult = { __typename: 'Query', artistIndex: { __typename: 'ArtistIndexQL', groups: Array<{ __typename: 'ArtistIndexGroupQL', name: string, items: Array<{ __typename: 'ArtistQL', id: string, name: string, genresCount: number }> }> } };

export type ImageQueryVariables = GQL.Exact<{
  id: GQL.Scalars['ID'];
}>;


export type ImageQueryResult = { __typename: 'Query', artwork: { __typename: 'ArtworkQL', id: string, width?: number | null | undefined, height?: number | null | undefined } };

export type AlbumIndexQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type AlbumIndexQueryResult = { __typename: 'Query', albumIndex: { __typename: 'AlbumIndexQL', groups: Array<{ __typename: 'AlbumIndexGroupQL', name: string, items: Array<{ __typename: 'AlbumQL', id: string }> }> } };

export type ArtistIndexQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type ArtistIndexQueryResult = { __typename: 'Query', artistIndex: { __typename: 'ArtistIndexQL', groups: Array<{ __typename: 'ArtistIndexGroupQL', name: string, items: Array<{ __typename: 'ArtistQL', id: string }> }> } };

export type FolderIndexQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type FolderIndexQueryResult = { __typename: 'Query', folderIndex: { __typename: 'FolderIndexQL', groups: Array<{ __typename: 'FolderIndexGroupQL', name: string, items: Array<{ __typename: 'FolderQL', id: string }> }> } };

export type GenreIndexQueryVariables = GQL.Exact<{ [key: string]: never; }>;


export type GenreIndexQueryResult = { __typename: 'Query', genreIndex: { __typename: 'GenreIndexQL', groups: Array<{ __typename: 'GenreIndexGroupQL', name: string, items: Array<{ __typename: 'GenreQL', id: string }> }> } };

export const AlbumDetailFragmentDoc = gql`
    fragment AlbumDetail on AlbumQL {
  id
  name
  albumType
  artist {
    id
  }
}
    `;
export const ArtistInfoFragmentDoc = gql`
    fragment ArtistInfo on ArtistQL {
  id
  name
  genresCount
}
    `;
export const ArtistDetailFragmentDoc = gql`
    fragment ArtistDetail on ArtistQL {
  ...ArtistInfo
  albums {
    name
  }
}
    ${ArtistInfoFragmentDoc}`;
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
    query albums($skip: Int!, $take: Int) {
  albums(page: {skip: $skip, take: $take}) {
    items {
      ...AlbumDetail
    }
    total
  }
}
    ${AlbumDetailFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AlbumsGQL extends Apollo.Query<AlbumsQueryResult, AlbumsQueryVariables> {
    document = AlbumsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ArtistDocument = gql`
    query artist($id: ID!) {
  artist(id: $id) {
    ...ArtistDetail
  }
}
    ${ArtistDetailFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtistGQL extends Apollo.Query<ArtistQueryResult, ArtistQueryVariables> {
    document = ArtistDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ArtistsDocument = gql`
    query artists($skip: Int!, $take: Int) {
  artists(page: {skip: $skip, take: $take}) {
    items {
      ...ArtistDetail
    }
    total
  }
}
    ${ArtistDetailFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtistsGQL extends Apollo.Query<ArtistsQueryResult, ArtistsQueryVariables> {
    document = ArtistsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ArtistsInfoDocument = gql`
    query artistsInfo($skip: Int!, $take: Int) {
  artists(page: {skip: $skip, take: $take}, order: {orderBy: name}) {
    items {
      ...ArtistInfo
    }
    total
  }
}
    ${ArtistInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtistsInfoGQL extends Apollo.Query<ArtistsInfoQueryResult, ArtistsInfoQueryVariables> {
    document = ArtistsInfoDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BandsDocument = gql`
    query bands {
  artistIndex {
    groups {
      name
      items {
        ...ArtistInfo
      }
    }
  }
}
    ${ArtistInfoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class BandsGQL extends Apollo.Query<BandsQueryResult, BandsQueryVariables> {
    document = BandsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ImageDocument = gql`
    query image($id: ID!) {
  artwork(id: $id) {
    id
    width
    height
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImageGQL extends Apollo.Query<ImageQueryResult, ImageQueryVariables> {
    document = ImageDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AlbumIndexDocument = gql`
    query albumIndex {
  albumIndex {
    groups {
      name
      items {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AlbumIndexGQL extends Apollo.Query<AlbumIndexQueryResult, AlbumIndexQueryVariables> {
    document = AlbumIndexDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ArtistIndexDocument = gql`
    query artistIndex {
  artistIndex {
    groups {
      name
      items {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ArtistIndexGQL extends Apollo.Query<ArtistIndexQueryResult, ArtistIndexQueryVariables> {
    document = ArtistIndexDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FolderIndexDocument = gql`
    query folderIndex {
  folderIndex {
    groups {
      name
      items {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FolderIndexGQL extends Apollo.Query<FolderIndexQueryResult, FolderIndexQueryVariables> {
    document = FolderIndexDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GenreIndexDocument = gql`
    query genreIndex {
  genreIndex {
    groups {
      name
      items {
        id
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GenreIndexGQL extends Apollo.Query<GenreIndexQueryResult, GenreIndexQueryVariables> {
    document = GenreIndexDocument;

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
      private albumsGql: AlbumsGQL,
      private artistGql: ArtistGQL,
      private artistsGql: ArtistsGQL,
      private artistsInfoGql: ArtistsInfoGQL,
      private bandsGql: BandsGQL,
      private imageGql: ImageGQL,
      private albumIndexGql: AlbumIndexGQL,
      private artistIndexGql: ArtistIndexGQL,
      private folderIndexGql: FolderIndexGQL,
      private genreIndexGql: GenreIndexGQL
    ) {}

    album(variables: AlbumQueryVariables, options?: QueryOptionsAlone<AlbumQueryVariables>) {
      return this.albumGql.fetch(variables, options)
    }

    albumWatch(variables: AlbumQueryVariables, options?: WatchQueryOptionsAlone<AlbumQueryVariables>) {
      return this.albumGql.watch(variables, options)
    }

    albums(variables: AlbumsQueryVariables, options?: QueryOptionsAlone<AlbumsQueryVariables>) {
      return this.albumsGql.fetch(variables, options)
    }

    albumsWatch(variables: AlbumsQueryVariables, options?: WatchQueryOptionsAlone<AlbumsQueryVariables>) {
      return this.albumsGql.watch(variables, options)
    }

    artist(variables: ArtistQueryVariables, options?: QueryOptionsAlone<ArtistQueryVariables>) {
      return this.artistGql.fetch(variables, options)
    }

    artistWatch(variables: ArtistQueryVariables, options?: WatchQueryOptionsAlone<ArtistQueryVariables>) {
      return this.artistGql.watch(variables, options)
    }

    artists(variables: ArtistsQueryVariables, options?: QueryOptionsAlone<ArtistsQueryVariables>) {
      return this.artistsGql.fetch(variables, options)
    }

    artistsWatch(variables: ArtistsQueryVariables, options?: WatchQueryOptionsAlone<ArtistsQueryVariables>) {
      return this.artistsGql.watch(variables, options)
    }

    artistsInfo(variables: ArtistsInfoQueryVariables, options?: QueryOptionsAlone<ArtistsInfoQueryVariables>) {
      return this.artistsInfoGql.fetch(variables, options)
    }

    artistsInfoWatch(variables: ArtistsInfoQueryVariables, options?: WatchQueryOptionsAlone<ArtistsInfoQueryVariables>) {
      return this.artistsInfoGql.watch(variables, options)
    }

    bands(variables?: BandsQueryVariables, options?: QueryOptionsAlone<BandsQueryVariables>) {
      return this.bandsGql.fetch(variables, options)
    }

    bandsWatch(variables?: BandsQueryVariables, options?: WatchQueryOptionsAlone<BandsQueryVariables>) {
      return this.bandsGql.watch(variables, options)
    }

    image(variables: ImageQueryVariables, options?: QueryOptionsAlone<ImageQueryVariables>) {
      return this.imageGql.fetch(variables, options)
    }

    imageWatch(variables: ImageQueryVariables, options?: WatchQueryOptionsAlone<ImageQueryVariables>) {
      return this.imageGql.watch(variables, options)
    }

    albumIndex(variables?: AlbumIndexQueryVariables, options?: QueryOptionsAlone<AlbumIndexQueryVariables>) {
      return this.albumIndexGql.fetch(variables, options)
    }

    albumIndexWatch(variables?: AlbumIndexQueryVariables, options?: WatchQueryOptionsAlone<AlbumIndexQueryVariables>) {
      return this.albumIndexGql.watch(variables, options)
    }

    artistIndex(variables?: ArtistIndexQueryVariables, options?: QueryOptionsAlone<ArtistIndexQueryVariables>) {
      return this.artistIndexGql.fetch(variables, options)
    }

    artistIndexWatch(variables?: ArtistIndexQueryVariables, options?: WatchQueryOptionsAlone<ArtistIndexQueryVariables>) {
      return this.artistIndexGql.watch(variables, options)
    }

    folderIndex(variables?: FolderIndexQueryVariables, options?: QueryOptionsAlone<FolderIndexQueryVariables>) {
      return this.folderIndexGql.fetch(variables, options)
    }

    folderIndexWatch(variables?: FolderIndexQueryVariables, options?: WatchQueryOptionsAlone<FolderIndexQueryVariables>) {
      return this.folderIndexGql.watch(variables, options)
    }

    genreIndex(variables?: GenreIndexQueryVariables, options?: QueryOptionsAlone<GenreIndexQueryVariables>) {
      return this.genreIndexGql.fetch(variables, options)
    }

    genreIndexWatch(variables?: GenreIndexQueryVariables, options?: WatchQueryOptionsAlone<GenreIndexQueryVariables>) {
      return this.genreIndexGql.watch(variables, options)
    }
  }
