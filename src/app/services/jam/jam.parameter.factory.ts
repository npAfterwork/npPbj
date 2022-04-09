import {JamParameters} from '../../jam';

export class JamParamFactory {

  // <editor-fold desc="*** Includes ***">

  /**
   * folderState?: boolean;
   * folderCounts?: boolean;
   * folderParents?: boolean;
   * folderInfo?: boolean;
   * folderSimilar?: boolean;
   * folderArtworks?: boolean;
   */
  static p_include_folder(): JamParameters.IncludesFolder {
    return { folderState: true, folderTag: false, folderParents: false, folderCounts: true };
  }

  /**
   * folderChildren?: boolean;
   * folderSubfolders?: boolean;
   * folderTracks?: boolean;
   * extends IncludesTrack, IncludesFolder
   */
  static p_include_folder_children(folderChildren, folderSubfolders, folderTracks): JamParameters.IncludesFolderChildren {
    return { folderChildren, folderSubfolders, folderTracks, ...JamParamFactory.p_include_folder(), ...JamParamFactory.p_include_track() };
  }

  /**
   * extends IncludesAlbum
   * artistAlbums?: boolean;
   * artistAlbumIDs?: boolean;
   * artistState?: boolean;
   * artistTracks?: boolean;
   * artistTracksIDs?: boolean;
   * artistInfo?: boolean;
   * artistSimilar?: boolean;
   */
  static p_include_artist(includeAlbums: boolean, includeTracks: boolean, includeSimilar: boolean, includeInfo: boolean): JamParameters.IncludesArtist {
    return {
      artistAlbums:   includeAlbums,
      artistTracks:   includeTracks,
      artistState:    true,
      artistInfo:     includeInfo, // TODO: make include ?
      artistAlbumIDs: !includeAlbums,
      artistSimilar:  includeSimilar,
      artistTrackIDs: !includeTracks,
      ...(includeAlbums || includeTracks ? JamParamFactory.p_include_album(includeTracks) : {})
    };
  }

  /**
   * extends IncludesTrack
   * albumTracks?: boolean;
   * albumTrackIDs?: boolean;
   * albumState?: boolean;
   * albumInfo?: boolean;
   */
  static p_include_album(includeTracks: boolean): JamParameters.IncludesAlbum {
    return {
      albumTracks:   includeTracks,
      albumTrackIDs: true,
      albumState:    true,
      albumInfo:     false,
      ...(includeTracks ? JamParamFactory.p_include_track() : {})
    };
  }

  /**
   *  trackMedia?: boolean;
   *  trackTag?: boolean;
   *  trackRawTag?: boolean;
   *  trackState?: boolean;
   */
  static p_include_track(): JamParameters.IncludesTrack {
    return { trackState: true, trackTag: true, trackRawTag: false, trackMedia: false };
  }

  /**
   * extends IncludesTrack
   * playlistTracks?: boolean;
   * playlistTracksIDs?: boolean;
   * playlistState?: boolean;
   */
  static p_include_playlist(includeTracks): JamParameters.IncludesPlaylist {
    return {
      playlistTracks:   includeTracks,
      playlistState:    true,
      playlistTrackIDs: !includeTracks,
      ...JamParamFactory.p_include_track()
    };
  }

  /**
   *  extends IncludesEpisode
   *  podcastState?: boolean;
   *  podcastEpisodes?: boolean;
   */
  static p_include_podcast(includeEpisodes): JamParameters.IncludesPodcast {
    return {
      podcastEpisodes: includeEpisodes,
      podcastState:    true,
      ...JamParamFactory.p_include_episode()
    };
  }

  /**
   * extends IncludesTrack
   */
  static p_include_episode(): JamParameters.IncludesEpisode {
    return JamParamFactory.p_include_track();
  }

  // </editor-fold>

  // <editor-fold desc="*** IndexEntry ***">

  /**
   *  extends ID, IncludesArtist
   *  rootID?: string; // TODO ????
   */
  static p_artist(id: string, includeAlbums, includeTracks, includeSimilar): JamParameters.Artist {
    return { id, ...JamParamFactory.p_include_artist(includeAlbums, includeTracks, includeSimilar, true) };
  }

  static p_artists(ids: string[], includeAlbums, includeTracks, includeSimilar): JamParameters.Artists {
    return { ids, ...JamParamFactory.p_include_artist(includeAlbums, includeTracks, includeSimilar, true) };
  }

  /**
   *  extends ID, IncludesAlbum
   */
  static p_album(id: string, includeTracks): JamParameters.Album {
    return { id, ...JamParamFactory.p_include_album(includeTracks) };
  }

  static p_albums(ids: string[], includeTracks): JamParameters.Albums {
    return { ids, ...JamParamFactory.p_include_album(includeTracks) };
  }

  /**
   * extends ID, IncludesTrack
   */
  static p_track(id: string): JamParameters.Track {
    return { id, ...JamParamFactory.p_include_track() };
  }

  static p_tracks(ids: string[]): JamParameters.Tracks {
    return { ids, ...JamParamFactory.p_include_track() };
  }

  /**
   * extends ID, IncludesPlaylist
   */
  static p_playlist(id: string, includeTracks): JamParameters.Playlist {
    return { id, ...JamParamFactory.p_include_playlist(includeTracks) };
  }

  /**
   * extends ID, IncludesPodcast
   */
  static p_podcast(id: string, includeEpisodes: boolean): JamParameters.Podcast {
    return { id, ...JamParamFactory.p_include_podcast(includeEpisodes) };
  }

  /**
   * extends ID, IncludesEpisode
   */
  static p_episode(id: string): JamParameters.Episode {
    return { id, ...JamParamFactory.p_include_episode() };
  }

  // </editor-fold>

  // <editor-fold desc="*** List ***">

  /**
   *  extends Paginate
   *  list: ListType;
   */
  static p_list(list: JamParameters.ListType, pagination?: JamParameters.Paginate): JamParameters.List {
    return { list, ...(pagination || {}) };
  }

  /**
   * extends FolderSearchQuery, IncludesFolder, List
   */
  static p_folder_list(list: JamParameters.ListType, query?: JamParameters.FolderSearchQuery, pagination?: JamParameters.Paginate): JamParameters.FolderList {
    return {
      ...JamParamFactory.p_list(list, pagination),
      ...(query || {}),
      ...JamParamFactory.p_include_folder()
    };
  }

  /**
   * extends ArtistSearchQuery, IncludesArtist, List
   */
  static p_artist_list(list: JamParameters.ListType, includeAlbums, includeTracks, query?: JamParameters.ArtistSearchQuery, pagination?: JamParameters.Paginate): JamParameters.ArtistList {
    return {
      ...JamParamFactory.p_list(list, pagination),
      ...(query || {}),
      ...JamParamFactory.p_include_artist(includeAlbums, includeTracks, false, false)
    };
  }

  /**
   *  extends List, IncludesAlbum, AlbumSearchQuery
   */
  static p_album_list(list: JamParameters.ListType, includeTracks, query?: JamParameters.AlbumSearchQuery, pagination?: JamParameters.Paginate): JamParameters.AlbumList {
    return {
      ...JamParamFactory.p_list(list, pagination),
      ...(query || {}),
      ...JamParamFactory.p_include_album(includeTracks)
    };
  }

  /**
   * extends TrackSearchQuery, IncludesTrack, List
   */
  static p_track_list(list: JamParameters.ListType, query?: JamParameters.TrackSearchQuery, pagination?: JamParameters.Paginate): JamParameters.TrackList {
    return {
      ...JamParamFactory.p_list(list, pagination),
      ...(query || {}),
      ...JamParamFactory.p_include_track()
    };
  }

  /**
   * extends EpisodeSearchQuery, IncludesEpisode, List
   */
  static p_episode_list(list: JamParameters.ListType, query?: JamParameters.EpisodeSearchQuery, pagination?: JamParameters.Paginate): JamParameters.PodcastEpisodeList {
    return {
      ...JamParamFactory.p_list(list, pagination),
      ...(query || {}),
      ...JamParamFactory.p_include_episode()
    };
  }

  // </editor-fold>

  // <editor-fold desc="*** Search ***">

  /**
   * extends Paginate, RootSearchQuery
   */
  static p_root_search(query?: JamParameters.RootSearchQuery, pagination?: JamParameters.Paginate): JamParameters.RootSearch {
    return {
      ...{ hello: 'asdf' },
      ...query,
      ...pagination,
      ...JamParamFactory.p_include_track()
    };
  }

  /**
   * extends Paginate, FolderSearchQuery, IncludesFolderChildren
   */
  static p_folder_search(folderChildren: boolean, folderSubfolders: boolean, folderTracks: boolean,
    query: JamParameters.FolderSearchQuery, pagination: JamParameters.Paginate): JamParameters.FolderSearch {
    return {
      ...(query || {}),
      ...(pagination || {}),
      ...JamParamFactory.p_include_folder_children(folderChildren, folderSubfolders, folderTracks)
    };
  }

  /**
   * extends Paginate, ArtistSearchQuery, IncludesArtist
   */
  static p_artist_search(includeAlbums: boolean, includeTracks: boolean, query?: JamParameters.ArtistSearchQuery, pagination?: JamParameters.Paginate): JamParameters.ArtistSearch {
    return {
      ...(query || {}),
      ...(pagination || {}),
      ...JamParamFactory.p_include_artist(includeAlbums, includeTracks, false, false)
    };
  }

  /**
   * extends Paginate, AlbumSearchQuery, IncludesAlbum
   */
  static p_album_search(includeTracks: boolean, query?: JamParameters.AlbumSearchQuery, pagination?: JamParameters.Paginate): JamParameters.AlbumSearch {
    return {
      ...(query || {}),
      ...(pagination || {}),
      ...JamParamFactory.p_include_album(includeTracks)
    };
  }

  /**
   * extends Paginate, TrackSearchQuery, IncludesTrack
   */
  static p_track_search(query?: JamParameters.TrackSearchQuery, pagination?: JamParameters.Paginate): JamParameters.TrackSearch {
    return {
      ...(query || {}),
      ...(pagination || {}),
      ...JamParamFactory.p_include_track()
    };
  }

  /**
   * extends Paginate, PlaylistSearchQuery, IncludesPlaylist
   */
  static p_playlist_search(includeTracks, query?: JamParameters.PlaylistSearchQuery, pagination?: JamParameters.Paginate): JamParameters.PlaylistSearch {
    return { ...(query || {}), ...(pagination || {}), ...JamParamFactory.p_include_playlist(includeTracks) };
  }

  /**
   *  extends Paginate, PodcastSearchQuery, IncludesPodcast
   */
  static p_podcast_search(includeEpisodes: boolean, query?: JamParameters.PodcastSearchQuery, pagination?: JamParameters.Paginate): JamParameters.PodcastSearch {
    return { ...(query || {}), ...(pagination || {}), ...JamParamFactory.p_include_podcast(includeEpisodes) };
  }

  /**
   *  extends Paginate, EpisodeSearchQuery, IncludesEpisode
   */
  static p_episode_search(query?: JamParameters.EpisodeSearchQuery, pagination?: JamParameters.Paginate): JamParameters.EpisodeSearch {
    return { ...(query || {}), ...(pagination || {}), ...JamParamFactory.p_include_episode() };
  }

  /**
   id?: string;
   ids?: Array<string>;
   query?: string;
   sortDescending?: boolean;
   sortField?: BaseSortField | any;
   */
  static p_newest_episode_search_query(): JamParameters.EpisodeSearchQuery {
    return { sortField: 'created', sortDescending: true };
  }

  static p_newest_artist_search_query(): JamParameters.ArtistSearchQuery {
    return { sortField: 'created', sortDescending: true };
  }

  static p_newest_album_search_query(): JamParameters.AlbumSearchQuery {
    return { sortField: 'created', sortDescending: true };
  }

  static p_newest_track_search_query(): JamParameters.TrackSearchQuery {
    return { sortField: 'created', sortDescending: true };
  }

  static p_newest_folder_search_query(): JamParameters.FolderSearchQuery {
    return { sortField: 'created', sortDescending: true };
  }

  // </editor-fold>

  static p_playlist_update(id: string, trackIDs: string[]): JamParameters.PlaylistUpdate {
    return {
      id,
      trackIDs
    };
  }
}
