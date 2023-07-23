export declare namespace GQL {
type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
}

interface AdminChangeQueueInfoQl {
  __typename: 'AdminChangeQueueInfoQL';
  done: Scalars['Int'];
  error: Scalars['String'];
  id: Scalars['ID'];
  position: Scalars['Int'];
}

interface AdminSettingsChatMaxAgeQl {
  __typename: 'AdminSettingsChatMaxAgeQL';
  unit: Scalars['String'];
  value: Scalars['Int'];
}

interface AdminSettingsChatQl {
  __typename: 'AdminSettingsChatQL';
  maxAge: AdminSettingsChatMaxAgeQl;
  maxMessages: Scalars['Int'];
}

interface AdminSettingsExternalQl {
  __typename: 'AdminSettingsExternalQL';
  enabled: Scalars['Boolean'];
}

interface AdminSettingsIndexQl {
  __typename: 'AdminSettingsIndexQL';
  ignoreArticles: Array<Scalars['String']>;
}

interface AdminSettingsLibraryQl {
  __typename: 'AdminSettingsLibraryQL';
  scanAtStart: Scalars['Boolean'];
}

interface AdminSettingsQl {
  __typename: 'AdminSettingsQL';
  chat: AdminSettingsChatQl;
  externalServices: AdminSettingsExternalQl;
  index: AdminSettingsIndexQl;
  library: AdminSettingsLibraryQl;
}

interface AlbumFilterArgsQl {
  albumTypes?: InputMaybe<Array<AlbumType>>;
  artist?: InputMaybe<Scalars['String']>;
  artistIDs?: InputMaybe<Array<Scalars['ID']>>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  fromYear?: InputMaybe<Scalars['Int']>;
  genreIDs?: InputMaybe<Array<Scalars['ID']>>;
  genres?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  mbArtistIDs?: InputMaybe<Array<Scalars['String']>>;
  mbReleaseIDs?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  notMbArtistID?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  rootIDs?: InputMaybe<Array<Scalars['ID']>>;
  seriesIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  slug?: InputMaybe<Scalars['String']>;
  toYear?: InputMaybe<Scalars['Int']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface AlbumIndexGroupQl {
  __typename: 'AlbumIndexGroupQL';
  items: Array<AlbumQl>;
  name: Scalars['String'];
}

interface AlbumIndexQl {
  __typename: 'AlbumIndexQL';
  groups: Array<AlbumIndexGroupQl>;
}

interface AlbumOrderArgsQl {
  orderBy?: InputMaybe<AlbumOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type AlbumOrderFields =
  | 'albumType'
  | 'artist'
  | 'created'
  | 'default'
  | 'duration'
  | 'name'
  | 'seriesNr'
  | 'updated'
  | 'year';

interface AlbumPageQl {
  __typename: 'AlbumPageQL';
  items: Array<AlbumQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface AlbumQl {
  __typename: 'AlbumQL';
  albumType: AlbumType;
  artist: ArtistQl;
  createdAt: Scalars['DateTime'];
  duration?: Maybe<Scalars['Float']>;
  folders: Array<FolderQl>;
  foldersCount: Scalars['Int'];
  genres: Array<GenreQl>;
  id: Scalars['ID'];
  mbArtistID?: Maybe<Scalars['String']>;
  mbReleaseID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  roots: Array<RootQl>;
  rootsCount: Scalars['Int'];
  series?: Maybe<SeriesQl>;
  seriesNr?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  state: StateQl;
  tracks: Array<TrackQl>;
  tracksCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['Int']>;
}

type AlbumType =
  | 'album'
  | 'audiobook'
  | 'bootleg'
  | 'compilation'
  | 'ep'
  | 'live'
  | 'series'
  | 'single'
  | 'soundtrack'
  | 'unknown';

interface ArtistFilterArgsQl {
  albumIDs?: InputMaybe<Array<Scalars['ID']>>;
  albumTrackIDs?: InputMaybe<Array<Scalars['ID']>>;
  albumTypes?: InputMaybe<Array<AlbumType>>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  genreIDs?: InputMaybe<Array<Scalars['ID']>>;
  genres?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  mbArtistIDs?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  notMbArtistID?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  rootIDs?: InputMaybe<Array<Scalars['ID']>>;
  seriesIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  slug?: InputMaybe<Scalars['String']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface ArtistIndexGroupQl {
  __typename: 'ArtistIndexGroupQL';
  items: Array<ArtistQl>;
  name: Scalars['String'];
}

interface ArtistIndexQl {
  __typename: 'ArtistIndexQL';
  groups: Array<ArtistIndexGroupQl>;
}

interface ArtistOrderArgsQl {
  orderBy?: InputMaybe<ArtistOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type ArtistOrderFields =
  | 'created'
  | 'default'
  | 'name'
  | 'nameSort'
  | 'updated';

interface ArtistPageQl {
  __typename: 'ArtistPageQL';
  items: Array<ArtistQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface ArtistQl {
  __typename: 'ArtistQL';
  albumTracks: Array<TrackQl>;
  albumTypes: Array<AlbumType>;
  albums: Array<AlbumQl>;
  albumsCount: Scalars['Int'];
  albumsTracksCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  folders: Array<FolderQl>;
  foldersCount: Scalars['Int'];
  genres: Array<GenreQl>;
  genresCount: Scalars['Int'];
  id: Scalars['ID'];
  mbArtistID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nameSort: Scalars['String'];
  roots: Array<RootQl>;
  rootsCount: Scalars['Int'];
  series: Array<SeriesQl>;
  seriesCount: Scalars['Int'];
  slug: Scalars['String'];
  state: StateQl;
  tracks: Array<TrackQl>;
  tracksCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
}

interface ArtworkFilterArgsQl {
  childOfID?: InputMaybe<Scalars['ID']>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  formats?: InputMaybe<Array<Scalars['String']>>;
  heightFrom?: InputMaybe<Scalars['Int']>;
  heightTo?: InputMaybe<Scalars['Int']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  sizeFrom?: InputMaybe<Scalars['Int']>;
  sizeTo?: InputMaybe<Scalars['Int']>;
  types?: InputMaybe<Array<ArtworkImageType>>;
  widthFrom?: InputMaybe<Scalars['Int']>;
  widthTo?: InputMaybe<Scalars['Int']>;
}

type ArtworkImageType =
  | 'artist'
  | 'back'
  | 'booklet'
  | 'front'
  | 'liner'
  | 'medium'
  | 'obi'
  | 'other'
  | 'poster'
  | 'raw'
  | 'spine'
  | 'sticker'
  | 'track'
  | 'tray'
  | 'unedited'
  | 'watermark';

interface ArtworkOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface ArtworkPageQl {
  __typename: 'ArtworkPageQL';
  items: Array<ArtworkQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface ArtworkQl {
  __typename: 'ArtworkQL';
  createdAt: Scalars['DateTime'];
  fileSize: Scalars['Int'];
  folder: FolderQl;
  format?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  statCreated: Scalars['DateTime'];
  statModified: Scalars['DateTime'];
  types: Array<ArtworkImageType>;
  updatedAt: Scalars['DateTime'];
  width?: Maybe<Scalars['Int']>;
}

type AudioFormatType =
  | 'flac'
  | 'flv'
  | 'm4a'
  | 'mp3'
  | 'mp4'
  | 'oga'
  | 'ogg'
  | 'wav'
  | 'webma';

interface BookmarkFilterArgsQl {
  comment?: InputMaybe<Scalars['String']>;
  episodeIDs?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
  userIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface BookmarkOrderArgsQl {
  orderBy?: InputMaybe<BookmarkOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type BookmarkOrderFields =
  | 'created'
  | 'default'
  | 'media'
  | 'position'
  | 'updated';

interface BookmarkPageQl {
  __typename: 'BookmarkPageQL';
  items: Array<BookmarkQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface BookmarkQl {
  __typename: 'BookmarkQL';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  episode?: Maybe<EpisodeQl>;
  id: Scalars['ID'];
  position: Scalars['Float'];
  track?: Maybe<TrackQl>;
  updatedAt: Scalars['DateTime'];
}

interface ChatQl {
  __typename: 'ChatQL';
  created: Scalars['DateTime'];
  message: Scalars['String'];
  userID: Scalars['ID'];
  userName: Scalars['String'];
}

type DefaultOrderFields =
  | 'created'
  | 'default'
  | 'name'
  | 'updated';

interface EpisodeChapterQl {
  __typename: 'EpisodeChapterQL';
  start: Scalars['Float'];
  title: Scalars['String'];
}

interface EpisodeEnclosureQl {
  __typename: 'EpisodeEnclosureQL';
  length?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  url: Scalars['String'];
}

interface EpisodeFilterArgsQl {
  authors?: InputMaybe<Array<Scalars['String']>>;
  guids?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  podcastIDs?: InputMaybe<Array<Scalars['ID']>>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  statuses?: InputMaybe<Array<PodcastStatus>>;
}

interface EpisodeOrderArgsQl {
  orderBy?: InputMaybe<EpisodeOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type EpisodeOrderFields =
  | 'created'
  | 'date'
  | 'default'
  | 'name'
  | 'status'
  | 'updated';

interface EpisodePageQl {
  __typename: 'EpisodePageQL';
  items: Array<EpisodeQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface EpisodeQl {
  __typename: 'EpisodeQL';
  author?: Maybe<Scalars['String']>;
  bookmarks: Array<BookmarkQl>;
  bookmarksCount: Scalars['Int'];
  chapters?: Maybe<Array<EpisodeChapterQl>>;
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  duration?: Maybe<Scalars['Float']>;
  enclosures?: Maybe<Array<EpisodeEnclosureQl>>;
  error?: Maybe<Scalars['String']>;
  fileCreated?: Maybe<Scalars['DateTime']>;
  fileModified?: Maybe<Scalars['DateTime']>;
  fileSize?: Maybe<Scalars['Int']>;
  guid?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  path?: Maybe<Scalars['String']>;
  podcast: PodcastQl;
  state: StateQl;
  status: PodcastStatus;
  summary?: Maybe<Scalars['String']>;
  tag?: Maybe<TagQl>;
  updatedAt: Scalars['DateTime'];
  waveform: WaveformQl;
}

interface ExtendedInfoQl {
  __typename: 'ExtendedInfoQL';
  description: Scalars['String'];
  license: Scalars['String'];
  licenseUrl: Scalars['String'];
  source: Scalars['String'];
  url: Scalars['String'];
}

interface ExtendedInfoResultQl {
  __typename: 'ExtendedInfoResultQL';
  info?: Maybe<ExtendedInfoQl>;
}

interface FolderFilterArgsQl {
  album?: InputMaybe<Scalars['String']>;
  albumIDs?: InputMaybe<Array<Scalars['ID']>>;
  albumTypes?: InputMaybe<Array<AlbumType>>;
  artist?: InputMaybe<Scalars['String']>;
  artistIDs?: InputMaybe<Array<Scalars['ID']>>;
  artistSort?: InputMaybe<Scalars['String']>;
  artworksIDs?: InputMaybe<Array<Scalars['ID']>>;
  childOfID?: InputMaybe<Scalars['ID']>;
  folderTypes?: InputMaybe<Array<FolderType>>;
  fromYear?: InputMaybe<Scalars['Int']>;
  genreIDs?: InputMaybe<Array<Scalars['ID']>>;
  genres?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  level?: InputMaybe<Scalars['Int']>;
  mbAlbumTypes?: InputMaybe<Array<Scalars['String']>>;
  mbArtistIDs?: InputMaybe<Array<Scalars['String']>>;
  mbReleaseGroupIDs?: InputMaybe<Array<Scalars['String']>>;
  mbReleaseIDs?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  parentIDs?: InputMaybe<Array<Scalars['ID']>>;
  query?: InputMaybe<Scalars['String']>;
  rootIDs?: InputMaybe<Array<Scalars['ID']>>;
  seriesIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
  toYear?: InputMaybe<Scalars['Int']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface FolderIndexGroupQl {
  __typename: 'FolderIndexGroupQL';
  items: Array<FolderQl>;
  name: Scalars['String'];
}

interface FolderIndexQl {
  __typename: 'FolderIndexQL';
  groups: Array<FolderIndexGroupQl>;
}

interface FolderOrderArgsQl {
  orderBy?: InputMaybe<FolderOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type FolderOrderFields =
  | 'created'
  | 'default'
  | 'level'
  | 'name'
  | 'title'
  | 'updated'
  | 'year';

interface FolderPageQl {
  __typename: 'FolderPageQL';
  items: Array<FolderQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface FolderQl {
  __typename: 'FolderQL';
  album?: Maybe<Scalars['String']>;
  albumTrackCount?: Maybe<Scalars['Int']>;
  albumType?: Maybe<AlbumType>;
  albums?: Maybe<Array<AlbumQl>>;
  albumsCount: Scalars['Int'];
  artist?: Maybe<Scalars['String']>;
  artistSort?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<ArtistQl>>;
  artistsCount: Scalars['Int'];
  artworks?: Maybe<Array<ArtworkQl>>;
  artworksCount: Scalars['Int'];
  children: Array<FolderQl>;
  childrenCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  folderType: FolderType;
  genres: Array<GenreQl>;
  genresCount: Scalars['Int'];
  id: Scalars['ID'];
  level: Scalars['Int'];
  mbAlbumType?: Maybe<Scalars['String']>;
  mbArtistID?: Maybe<Scalars['String']>;
  mbReleaseGroupID?: Maybe<Scalars['String']>;
  mbReleaseID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<FolderQl>;
  path: Scalars['String'];
  root: RootQl;
  rootsCount: Scalars['Int'];
  series?: Maybe<Array<SeriesQl>>;
  seriesCount: Scalars['Int'];
  statCreated: Scalars['DateTime'];
  statModified: Scalars['DateTime'];
  state: StateQl;
  title: Scalars['String'];
  tracks?: Maybe<Array<TrackQl>>;
  tracksCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['Int']>;
}

type FolderType =
  | 'album'
  | 'artist'
  | 'collection'
  | 'extras'
  | 'multialbum'
  | 'unknown';

interface GenreFilterArgsQl {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface GenreIndexGroupQl {
  __typename: 'GenreIndexGroupQL';
  items: Array<GenreQl>;
  name: Scalars['String'];
}

interface GenreIndexQl {
  __typename: 'GenreIndexQL';
  groups: Array<GenreIndexGroupQl>;
}

interface GenreOrderArgsQl {
  orderBy?: InputMaybe<GenreOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type GenreOrderFields =
  | 'created'
  | 'default'
  | 'name'
  | 'updated';

interface GenrePageQl {
  __typename: 'GenrePageQL';
  items: Array<GenreQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface GenreQl {
  __typename: 'GenreQL';
  albumCount: Scalars['Int'];
  albums: AlbumPageQl;
  artistCount: Scalars['Int'];
  artists: ArtistPageQl;
  createdAt: Scalars['DateTime'];
  folderCount: Scalars['Int'];
  folders: Array<FolderQl>;
  id: Scalars['ID'];
  name: Scalars['String'];
  series: Array<SeriesQl>;
  trackCount: Scalars['Int'];
  tracks: TrackPageQl;
  updatedAt: Scalars['DateTime'];
}


interface GenreQlAlbumsArgs {
  filter?: InputMaybe<AlbumFilterArgsQl>;
  order?: InputMaybe<Array<AlbumOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface GenreQlArtistsArgs {
  filter?: InputMaybe<ArtistFilterArgsQl>;
  order?: InputMaybe<Array<ArtistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface GenreQlTracksArgs {
  filter?: InputMaybe<TrackFilterArgsQl>;
  order?: InputMaybe<Array<TrackOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}

type ListType =
  | 'avghighest'
  | 'faved'
  | 'frequent'
  | 'highest'
  | 'random'
  | 'recent';

interface MediaTagRawQl {
  __typename: 'MediaTagRawQL';
  frames: Scalars['JSON'];
  version: Scalars['String'];
}

interface Mutation {
  __typename: 'Mutation';
  fav: StateQl;
  rate: StateQl;
  scrobble: NowPlayingQl;
}


interface MutationFavArgs {
  id: Scalars['ID'];
  remove?: InputMaybe<Scalars['Boolean']>;
}


interface MutationRateArgs {
  id: Scalars['ID'];
  rating: Scalars['Int'];
}


interface MutationScrobbleArgs {
  id: Scalars['ID'];
}

interface NowPlayingQl {
  __typename: 'NowPlayingQL';
  episode?: Maybe<EpisodeQl>;
  time: Scalars['Float'];
  track?: Maybe<TrackQl>;
  userID: Scalars['ID'];
  userName: Scalars['String'];
}

interface PageArgsQl {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}

interface PlayQueueEntryQl {
  __typename: 'PlayQueueEntryQL';
  createdAt: Scalars['DateTime'];
  episode?: Maybe<EpisodeQl>;
  id: Scalars['ID'];
  playQueue: PlayQueueQl;
  position: Scalars['Int'];
  track?: Maybe<TrackQl>;
  updatedAt: Scalars['DateTime'];
}

interface PlayQueueQl {
  __typename: 'PlayQueueQL';
  changedBy: Scalars['String'];
  createdAt: Scalars['DateTime'];
  current?: Maybe<Scalars['Int']>;
  duration?: Maybe<Scalars['Float']>;
  entries: Array<PlayQueueEntryQl>;
  entriesCount: Scalars['Int'];
  id: Scalars['ID'];
  position?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
}

interface PlaylistEntryQl {
  __typename: 'PlaylistEntryQL';
  createdAt: Scalars['DateTime'];
  episode?: Maybe<EpisodeQl>;
  id: Scalars['ID'];
  playlist: PlaylistQl;
  position: Scalars['Float'];
  track?: Maybe<TrackQl>;
  updatedAt: Scalars['DateTime'];
}

interface PlaylistFilterArgsQl {
  comment?: InputMaybe<Scalars['String']>;
  durationFrom?: InputMaybe<Scalars['Float']>;
  durationTo?: InputMaybe<Scalars['Float']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  userIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface PlaylistIndexGroupQl {
  __typename: 'PlaylistIndexGroupQL';
  items: Array<PlaylistQl>;
  name: Scalars['String'];
}

interface PlaylistIndexQl {
  __typename: 'PlaylistIndexQL';
  groups: Array<PlaylistIndexGroupQl>;
}

interface PlaylistOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface PlaylistPageQl {
  __typename: 'PlaylistPageQL';
  items: Array<PlaylistQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface PlaylistQl {
  __typename: 'PlaylistQL';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  duration: Scalars['Float'];
  entries: Array<PlaylistEntryQl>;
  entriesCount: Scalars['Int'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  state: StateQl;
  updatedAt: Scalars['DateTime'];
  userID: Scalars['ID'];
  userName: Scalars['String'];
}

interface PodcastDiscoverPageQl {
  __typename: 'PodcastDiscoverPageQL';
  items: Array<PodcastDiscoverQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface PodcastDiscoverQl {
  __typename: 'PodcastDiscoverQL';
  author: Scalars['String'];
  description: Scalars['String'];
  logo_url: Scalars['String'];
  mygpo_link: Scalars['String'];
  scaled_logo_url: Scalars['String'];
  subscribers: Scalars['Float'];
  subscribers_last_week: Scalars['Float'];
  title: Scalars['String'];
  url: Scalars['String'];
  website: Scalars['String'];
}

interface PodcastDiscoverTagPageQl {
  __typename: 'PodcastDiscoverTagPageQL';
  items: Array<PodcastDiscoverTagQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface PodcastDiscoverTagQl {
  __typename: 'PodcastDiscoverTagQL';
  tag: Scalars['String'];
  title: Scalars['String'];
  usage: Scalars['Float'];
}

interface PodcastFilterArgsQl {
  author?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  episodeIDs?: InputMaybe<Array<Scalars['ID']>>;
  generator?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  lastCheckFrom?: InputMaybe<Scalars['Float']>;
  lastCheckTo?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Float']>;
  statuses?: InputMaybe<Array<PodcastStatus>>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
}

interface PodcastIndexGroupQl {
  __typename: 'PodcastIndexGroupQL';
  items: Array<PodcastQl>;
  name: Scalars['String'];
}

interface PodcastIndexQl {
  __typename: 'PodcastIndexQL';
  groups: Array<PodcastIndexGroupQl>;
}

interface PodcastOrderArgsQl {
  orderBy?: InputMaybe<PodcastOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type PodcastOrderFields =
  | 'created'
  | 'default'
  | 'lastCheck'
  | 'name'
  | 'updated';

interface PodcastPageQl {
  __typename: 'PodcastPageQL';
  items: Array<PodcastQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface PodcastQl {
  __typename: 'PodcastQL';
  author?: Maybe<Scalars['String']>;
  categories: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  episodes: Array<EpisodeQl>;
  episodesCount: Scalars['Int'];
  errorMessage?: Maybe<Scalars['String']>;
  generator?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  lastCheck: Scalars['DateTime'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  state: StateQl;
  status: PodcastStatus;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
}

type PodcastStatus =
  | 'completed'
  | 'deleted'
  | 'downloading'
  | 'error'
  | 'new';

interface Query {
  __typename: 'Query';
  adminQueue: AdminChangeQueueInfoQl;
  adminSettings: AdminSettingsQl;
  album: AlbumQl;
  albumIndex: AlbumIndexQl;
  albumInfo: ExtendedInfoResultQl;
  albums: AlbumPageQl;
  artist: ArtistQl;
  artistIndex: ArtistIndexQl;
  artistInfo: ExtendedInfoResultQl;
  artists: ArtistPageQl;
  artwork: ArtworkQl;
  artworks: ArtworkPageQl;
  bookmark: BookmarkQl;
  bookmarks: BookmarkPageQl;
  chats: Array<ChatQl>;
  currentUser: UserQl;
  episode: EpisodeQl;
  episodes: EpisodePageQl;
  folder: FolderQl;
  folderIndex: FolderIndexQl;
  folderInfo: ExtendedInfoResultQl;
  folders: FolderPageQl;
  genre: GenreQl;
  genreIndex: GenreIndexQl;
  genres: GenrePageQl;
  nowPlaying: Array<NowPlayingQl>;
  playQueue: PlayQueueQl;
  playlist: PlaylistQl;
  playlistIndex: PlaylistIndexQl;
  playlists: PlaylistPageQl;
  podcast: PodcastQl;
  podcastIndex: PodcastIndexQl;
  podcasts: PodcastPageQl;
  podcastsDiscover: Array<PodcastDiscoverQl>;
  podcastsDiscoverByTag: PodcastDiscoverPageQl;
  podcastsDiscoverTags: PodcastDiscoverTagPageQl;
  podcastsDiscoverTop: PodcastDiscoverPageQl;
  radio: RadioQl;
  radioIndex: RadioIndexQl;
  radios: RadioPageQl;
  root: RootQl;
  roots: RootPageQl;
  series: SeriesQl;
  seriesIndex: SeriesIndexQl;
  seriesInfo: ExtendedInfoResultQl;
  serieses: SeriesPageQl;
  session: SessionQl;
  sessions: SessionPageQl;
  state: StateQl;
  stats: StatsQl;
  track: TrackQl;
  tracks: TrackPageQl;
  user: UserQl;
  userIndex: UserIndexQl;
  users: UserPageQl;
  version: Scalars['String'];
  waveform: WaveformQl;
}


interface QueryAdminQueueArgs {
  id: Scalars['ID'];
}


interface QueryAlbumArgs {
  id: Scalars['ID'];
}


interface QueryAlbumIndexArgs {
  filter?: InputMaybe<AlbumFilterArgsQl>;
}


interface QueryAlbumInfoArgs {
  id: Scalars['ID'];
}


interface QueryAlbumsArgs {
  filter?: InputMaybe<AlbumFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<AlbumOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryArtistArgs {
  id: Scalars['ID'];
}


interface QueryArtistIndexArgs {
  filter?: InputMaybe<ArtistFilterArgsQl>;
}


interface QueryArtistInfoArgs {
  id: Scalars['ID'];
}


interface QueryArtistsArgs {
  filter?: InputMaybe<ArtistFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<ArtistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryArtworkArgs {
  id: Scalars['ID'];
}


interface QueryArtworksArgs {
  filter?: InputMaybe<ArtworkFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<ArtworkOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryBookmarkArgs {
  id: Scalars['ID'];
}


interface QueryBookmarksArgs {
  filter?: InputMaybe<BookmarkFilterArgsQl>;
  order?: InputMaybe<Array<BookmarkOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface QueryChatsArgs {
  since?: InputMaybe<Scalars['Float']>;
}


interface QueryEpisodeArgs {
  id: Scalars['ID'];
}


interface QueryEpisodesArgs {
  filter?: InputMaybe<EpisodeFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<EpisodeOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryFolderArgs {
  id: Scalars['ID'];
}


interface QueryFolderIndexArgs {
  filter?: InputMaybe<FolderFilterArgsQl>;
}


interface QueryFolderInfoArgs {
  id: Scalars['ID'];
}


interface QueryFoldersArgs {
  filter?: InputMaybe<FolderFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<FolderOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryGenreArgs {
  id: Scalars['ID'];
}


interface QueryGenreIndexArgs {
  filter?: InputMaybe<GenreFilterArgsQl>;
}


interface QueryGenresArgs {
  filter?: InputMaybe<GenreFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<GenreOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryPlaylistArgs {
  id: Scalars['ID'];
}


interface QueryPlaylistIndexArgs {
  filter?: InputMaybe<PlaylistFilterArgsQl>;
}


interface QueryPlaylistsArgs {
  filter?: InputMaybe<PlaylistFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<PlaylistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryPodcastArgs {
  id: Scalars['ID'];
}


interface QueryPodcastIndexArgs {
  filter?: InputMaybe<PodcastFilterArgsQl>;
}


interface QueryPodcastsArgs {
  filter?: InputMaybe<PodcastFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<PodcastOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryPodcastsDiscoverArgs {
  query: Scalars['String'];
}


interface QueryPodcastsDiscoverByTagArgs {
  skip?: InputMaybe<Scalars['Int']>;
  tag: Scalars['String'];
  take?: InputMaybe<Scalars['Int']>;
}


interface QueryPodcastsDiscoverTagsArgs {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}


interface QueryPodcastsDiscoverTopArgs {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}


interface QueryRadioArgs {
  id: Scalars['ID'];
}


interface QueryRadioIndexArgs {
  filter?: InputMaybe<RadioFilterArgsQl>;
}


interface QueryRadiosArgs {
  filter?: InputMaybe<RadioFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<RadioOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryRootArgs {
  id: Scalars['ID'];
}


interface QueryRootsArgs {
  filter?: InputMaybe<RootFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<RootOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QuerySeriesArgs {
  id: Scalars['ID'];
}


interface QuerySeriesIndexArgs {
  filter?: InputMaybe<SeriesFilterArgsQl>;
}


interface QuerySeriesInfoArgs {
  id: Scalars['ID'];
}


interface QuerySeriesesArgs {
  filter?: InputMaybe<SeriesFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<SeriesOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QuerySessionsArgs {
  filter?: InputMaybe<SessionFilterArgsQl>;
  order?: InputMaybe<Array<SessionOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface QueryStateArgs {
  id: Scalars['ID'];
}


interface QueryStatsArgs {
  rootID?: InputMaybe<Scalars['ID']>;
}


interface QueryTrackArgs {
  id: Scalars['ID'];
}


interface QueryTracksArgs {
  filter?: InputMaybe<TrackFilterArgsQl>;
  list?: InputMaybe<ListType>;
  order?: InputMaybe<Array<TrackOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
  seed?: InputMaybe<Scalars['String']>;
}


interface QueryUserArgs {
  id: Scalars['ID'];
}


interface QueryUserIndexArgs {
  filter?: InputMaybe<UserFilterArgsQl>;
}


interface QueryUsersArgs {
  filter?: InputMaybe<UserFilterArgsQl>;
  order?: InputMaybe<Array<UserOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface QueryWaveformArgs {
  id: Scalars['ID'];
}

interface RadioFilterArgsQl {
  disabled?: InputMaybe<Scalars['Boolean']>;
  homepage?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  since?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
}

interface RadioIndexGroupQl {
  __typename: 'RadioIndexGroupQL';
  items: Array<RadioQl>;
  name: Scalars['String'];
}

interface RadioIndexQl {
  __typename: 'RadioIndexQL';
  groups: Array<RadioIndexGroupQl>;
}

interface RadioOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface RadioPageQl {
  __typename: 'RadioPageQL';
  items: Array<RadioQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface RadioQl {
  __typename: 'RadioQL';
  createdAt: Scalars['DateTime'];
  disabled: Scalars['Boolean'];
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  state: StateQl;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
}

interface RootFilterArgsQl {
  albumIDs?: InputMaybe<Array<Scalars['ID']>>;
  artistIDs?: InputMaybe<Array<Scalars['ID']>>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  seriesIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  strategies: Array<RootScanStrategy>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface RootOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface RootPageQl {
  __typename: 'RootPageQL';
  items: Array<RootQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface RootQl {
  __typename: 'RootQL';
  albums: Array<AlbumQl>;
  artists: Array<ArtistQl>;
  createdAt: Scalars['DateTime'];
  folders: Array<FolderQl>;
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  series: Array<SeriesQl>;
  status: RootStatusQl;
  strategy: RootScanStrategy;
  tracks: Array<TrackQl>;
  updatedAt: Scalars['DateTime'];
}

type RootScanStrategy =
  | 'artistalbum'
  | 'audiobook'
  | 'auto'
  | 'compilation';

interface RootStatusQl {
  __typename: 'RootStatusQL';
  error?: Maybe<Scalars['String']>;
  lastScan?: Maybe<Scalars['DateTime']>;
  scanning?: Maybe<Scalars['Boolean']>;
}

interface SeriesFilterArgsQl {
  albumIDs?: InputMaybe<Array<Scalars['ID']>>;
  albumTypes?: InputMaybe<Array<AlbumType>>;
  artistIDs?: InputMaybe<Array<Scalars['ID']>>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  genreIDs?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  rootIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  trackIDs?: InputMaybe<Array<Scalars['ID']>>;
}

interface SeriesIndexGroupQl {
  __typename: 'SeriesIndexGroupQL';
  items: Array<SeriesQl>;
  name: Scalars['String'];
}

interface SeriesIndexQl {
  __typename: 'SeriesIndexQL';
  groups: Array<SeriesIndexGroupQl>;
}

interface SeriesOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface SeriesPageQl {
  __typename: 'SeriesPageQL';
  items: Array<SeriesQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface SeriesQl {
  __typename: 'SeriesQL';
  albumTypes: Array<AlbumType>;
  albums: Array<AlbumQl>;
  albumsCount: Scalars['Int'];
  artist?: Maybe<ArtistQl>;
  createdAt: Scalars['DateTime'];
  folders: Array<FolderQl>;
  foldersCount: Scalars['Int'];
  genres: Array<GenreQl>;
  genresCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  roots: Array<RootQl>;
  rootsCount: Scalars['Int'];
  state: StateQl;
  tracks: Array<TrackQl>;
  tracksCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
}

interface SessionFilterArgsQl {
  agent?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  expiresFrom?: InputMaybe<Scalars['Float']>;
  expiresTo?: InputMaybe<Scalars['Float']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  mode?: InputMaybe<SessionMode>;
  since?: InputMaybe<Scalars['Float']>;
  userIDs?: InputMaybe<Array<Scalars['ID']>>;
}

type SessionMode =
  | 'browser'
  | 'jwt';

interface SessionOrderArgsQl {
  orderBy?: InputMaybe<SessionOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type SessionOrderFields =
  | 'default'
  | 'expires';

interface SessionPageQl {
  __typename: 'SessionPageQL';
  items: Array<SessionQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface SessionQl {
  __typename: 'SessionQL';
  agent: Scalars['String'];
  client: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expires: Scalars['DateTime'];
  id: Scalars['ID'];
  mode: SessionMode;
  updatedAt: Scalars['DateTime'];
}

interface StateQl {
  __typename: 'StateQL';
  createdAt: Scalars['DateTime'];
  faved?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lastPlayed?: Maybe<Scalars['DateTime']>;
  played?: Maybe<Scalars['Int']>;
  rated?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
}

interface StatsAlbumTypesQl {
  __typename: 'StatsAlbumTypesQL';
  album: Scalars['Int'];
  artistCompilation: Scalars['Int'];
  audiobook: Scalars['Int'];
  bootleg: Scalars['Int'];
  compilation: Scalars['Int'];
  ep: Scalars['Int'];
  live: Scalars['Int'];
  series: Scalars['Int'];
  single: Scalars['Int'];
  soundtrack: Scalars['Int'];
  unknown: Scalars['Int'];
}

interface StatsQl {
  __typename: 'StatsQL';
  album: Scalars['Int'];
  albumTypes: StatsAlbumTypesQl;
  artist: Scalars['Int'];
  artistTypes: StatsAlbumTypesQl;
  folder: Scalars['Int'];
  rootID?: Maybe<Scalars['ID']>;
  series: Scalars['Int'];
  track: Scalars['Int'];
}

interface TagChapterQl {
  __typename: 'TagChapterQL';
  end: Scalars['Float'];
  start: Scalars['Float'];
  title: Scalars['String'];
}

type TagFormatType =
  | 'ffmpeg'
  | 'id3v1'
  | 'id3v20'
  | 'id3v21'
  | 'id3v22'
  | 'id3v23'
  | 'id3v24'
  | 'none'
  | 'vorbis';

interface TagQl {
  __typename: 'TagQL';
  album?: Maybe<Scalars['String']>;
  albumArtist?: Maybe<Scalars['String']>;
  albumArtistSort?: Maybe<Scalars['String']>;
  albumSort?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  artistSort?: Maybe<Scalars['String']>;
  chapters?: Maybe<Array<TagChapterQl>>;
  createdAt: Scalars['DateTime'];
  disc?: Maybe<Scalars['Int']>;
  discTotal?: Maybe<Scalars['Int']>;
  format: TagFormatType;
  genres?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  lyrics?: Maybe<Scalars['String']>;
  mbAlbumArtistID?: Maybe<Scalars['String']>;
  mbAlbumStatus?: Maybe<Scalars['String']>;
  mbAlbumType?: Maybe<Scalars['String']>;
  mbArtistID?: Maybe<Scalars['String']>;
  mbRecordingID?: Maybe<Scalars['String']>;
  mbReleaseCountry?: Maybe<Scalars['String']>;
  mbReleaseGroupID?: Maybe<Scalars['String']>;
  mbReleaseID?: Maybe<Scalars['String']>;
  mbReleaseTrackID?: Maybe<Scalars['String']>;
  mbTrackID?: Maybe<Scalars['String']>;
  mediaBitRate?: Maybe<Scalars['Float']>;
  mediaChannels?: Maybe<Scalars['Int']>;
  mediaDuration?: Maybe<Scalars['Float']>;
  mediaEncoded?: Maybe<Scalars['String']>;
  mediaFormat?: Maybe<AudioFormatType>;
  mediaMode?: Maybe<Scalars['String']>;
  mediaSampleRate?: Maybe<Scalars['Float']>;
  mediaVersion?: Maybe<Scalars['String']>;
  nrTagImages?: Maybe<Scalars['Int']>;
  series?: Maybe<Scalars['String']>;
  seriesNr?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleSort?: Maybe<Scalars['String']>;
  trackNr?: Maybe<Scalars['Int']>;
  trackTotal?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['Int']>;
}

interface TrackFilterArgsQl {
  album?: InputMaybe<Scalars['String']>;
  albumArtistIDs?: InputMaybe<Array<Scalars['ID']>>;
  albumIDs?: InputMaybe<Array<Scalars['ID']>>;
  artist?: InputMaybe<Scalars['String']>;
  artistIDs?: InputMaybe<Array<Scalars['ID']>>;
  bookmarkIDs?: InputMaybe<Array<Scalars['ID']>>;
  childOfID?: InputMaybe<Scalars['ID']>;
  folderIDs?: InputMaybe<Array<Scalars['ID']>>;
  fromYear?: InputMaybe<Scalars['Int']>;
  genreIDs?: InputMaybe<Array<Scalars['ID']>>;
  genres?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  rootIDs?: InputMaybe<Array<Scalars['ID']>>;
  seriesIDs?: InputMaybe<Array<Scalars['ID']>>;
  since?: InputMaybe<Scalars['Float']>;
  toYear?: InputMaybe<Scalars['Int']>;
}

interface TrackLyricsQl {
  __typename: 'TrackLyricsQL';
  lyrics?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
}

interface TrackOrderArgsQl {
  orderBy?: InputMaybe<TrackOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

type TrackOrderFields =
  | 'album'
  | 'created'
  | 'default'
  | 'discNr'
  | 'filename'
  | 'parent'
  | 'seriesNr'
  | 'title'
  | 'trackNr'
  | 'updated';

interface TrackPageQl {
  __typename: 'TrackPageQL';
  items: Array<TrackQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface TrackQl {
  __typename: 'TrackQL';
  album?: Maybe<AlbumQl>;
  albumArtist?: Maybe<ArtistQl>;
  artist?: Maybe<ArtistQl>;
  bookmarks: Array<BookmarkQl>;
  bookmarksCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  fileCreated: Scalars['DateTime'];
  fileModified: Scalars['DateTime'];
  fileName: Scalars['String'];
  fileSize: Scalars['Float'];
  folder: FolderQl;
  genres: Array<GenreQl>;
  id: Scalars['ID'];
  lyrics: TrackLyricsQl;
  name: Scalars['String'];
  path: Scalars['String'];
  rawTag: MediaTagRawQl;
  root: RootQl;
  series?: Maybe<SeriesQl>;
  state: StateQl;
  tag?: Maybe<TagQl>;
  updatedAt: Scalars['DateTime'];
  waveform: WaveformQl;
}

interface UserDetailStatsQl {
  __typename: 'UserDetailStatsQL';
  album: Scalars['Int'];
  albumTypes: StatsAlbumTypesQl;
  artist: Scalars['Int'];
  artistTypes: StatsAlbumTypesQl;
  folder: Scalars['Int'];
  series: Scalars['Int'];
  track: Scalars['Int'];
}

interface UserFavoritesQl {
  __typename: 'UserFavoritesQL';
  albums: AlbumPageQl;
  artists: ArtistPageQl;
  artworks: ArtistPageQl;
  episodes: EpisodePageQl;
  folders: FolderPageQl;
  playlists: PlaylistPageQl;
  podcasts: PodcastPageQl;
  series: SeriesPageQl;
  tracks: TrackPageQl;
}


interface UserFavoritesQlAlbumsArgs {
  filter?: InputMaybe<AlbumFilterArgsQl>;
  order?: InputMaybe<Array<AlbumOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlArtistsArgs {
  filter?: InputMaybe<ArtistFilterArgsQl>;
  order?: InputMaybe<Array<ArtistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlArtworksArgs {
  filter?: InputMaybe<ArtworkFilterArgsQl>;
  order?: InputMaybe<Array<ArtworkOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlEpisodesArgs {
  filter?: InputMaybe<EpisodeFilterArgsQl>;
  order?: InputMaybe<Array<EpisodeOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlFoldersArgs {
  filter?: InputMaybe<FolderFilterArgsQl>;
  order?: InputMaybe<Array<FolderOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlPlaylistsArgs {
  filter?: InputMaybe<PlaylistFilterArgsQl>;
  order?: InputMaybe<Array<PlaylistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlPodcastsArgs {
  filter?: InputMaybe<PodcastFilterArgsQl>;
  order?: InputMaybe<Array<PodcastOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlSeriesArgs {
  filter?: InputMaybe<SeriesFilterArgsQl>;
  order?: InputMaybe<Array<SeriesOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserFavoritesQlTracksArgs {
  filter?: InputMaybe<TrackFilterArgsQl>;
  order?: InputMaybe<Array<TrackOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}

interface UserFilterArgsQl {
  email?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<UserRole>>;
  since?: InputMaybe<Scalars['Float']>;
}

interface UserIndexGroupQl {
  __typename: 'UserIndexGroupQL';
  items: Array<UserQl>;
  name: Scalars['String'];
}

interface UserIndexQl {
  __typename: 'UserIndexQL';
  groups: Array<UserIndexGroupQl>;
}

interface UserOrderArgsQl {
  orderBy?: InputMaybe<DefaultOrderFields>;
  orderDesc?: InputMaybe<Scalars['Boolean']>;
}

interface UserPageQl {
  __typename: 'UserPageQL';
  items: Array<UserQl>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
}

interface UserQl {
  __typename: 'UserQL';
  bookmarks: BookmarkPageQl;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favorites: UserFavoritesQl;
  id: Scalars['ID'];
  maxBitRate?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  playQueue?: Maybe<PlayQueueQl>;
  playlists: PlaylistPageQl;
  roles: Array<UserRole>;
  sessions: SessionPageQl;
  stats: UserStatsQl;
  updatedAt: Scalars['DateTime'];
}


interface UserQlBookmarksArgs {
  filter?: InputMaybe<BookmarkFilterArgsQl>;
  order?: InputMaybe<Array<BookmarkOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserQlPlaylistsArgs {
  filter?: InputMaybe<PlaylistFilterArgsQl>;
  order?: InputMaybe<Array<PlaylistOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}


interface UserQlSessionsArgs {
  filter?: InputMaybe<SessionFilterArgsQl>;
  order?: InputMaybe<Array<SessionOrderArgsQl>>;
  page?: InputMaybe<PageArgsQl>;
}

type UserRole =
  | 'admin'
  | 'podcast'
  | 'stream'
  | 'upload';

interface UserStatsQl {
  __typename: 'UserStatsQL';
  bookmark: Scalars['Int'];
  favorite: UserDetailStatsQl;
  played: UserDetailStatsQl;
  playlist: Scalars['Int'];
}

interface WaveformQl {
  __typename: 'WaveformQL';
  json?: Maybe<Scalars['String']>;
  svg?: Maybe<Scalars['String']>;
}


interface WaveformQlSvgArgs {
  width: Scalars['Int'];
}

}