import {JamParameters, JamService} from '../../jam';
import {UnsupportedItemType} from '../../model/errors';
import {Pbj} from '../../model/model';
import {JamParamFactory} from '../jam/jam.parameter.factory';
import {PbjDataStore} from './datastore.model';
import {Injectable} from '@angular/core';

// TODO: Extract Interface for Offline use

@Injectable({
  providedIn: 'root'
})
export class DataServiceProxy {

  constructor(
    private readonly serverApi: JamService,
    private readonly dataStore: PbjDataStore
  ) {
  }

  async getList(list: Pbj.ListType, type: Pbj.ItemType, includes: Pbj.ItemType[], offset = 0, amount = 30): Promise<Pbj.Base[]> {
    const includeAlbums = includes ? includes.indexOf('album') >= 0 : undefined;
    const includeTracks = includes ? includes.indexOf('track') >= 0 : undefined;
    const includeFolder = includes ? includes.indexOf('folder') >= 0 : undefined;
    let items: any;
    switch (type) {
      case 'artist':
        items = list === 'newest'
          ? await this.getArtistSearch(includeAlbums, includeTracks, JamParamFactory.p_newest_artist_search_query(), { amount, offset })
          : await this.getArtistList(list, includeAlbums, includeTracks, { amount, offset });
        break;
      case 'album':
        items = (list === 'newest')
          ? await this.getAlbumSearch(includeTracks, JamParamFactory.p_newest_album_search_query(), { amount, offset })
          : await this.getAlbumList(list, includeTracks, { amount, offset });
        break;
      case 'track':
        items = list === 'newest'
          ? await this.getTrackSearch(JamParamFactory.p_newest_track_search_query(), { amount, offset })
          : await this.getTrackList(list, { amount, offset });
        break;
      case 'folder':
        items = list === 'newest'
          ? await this.getFolderSearch(includeFolder, false, includeTracks, JamParamFactory.p_newest_folder_search_query(), {
            amount, offset
          })
          : await this.getFolderList(list, { amount, offset });
        break;
      case 'episode':
        items = list === 'newest'
          ? await this.getEpisodeSearch(JamParamFactory.p_newest_episode_search_query(), { amount, offset })
          : await this.getEpisodeList(list);
        //          : await this.getEpisodeList(list, { amount, offset});
        break;
      default:
        console.warn('not supported list type', type);
        return [];
    }
    return this.dataStore.updateList(list, type, items);
  }

  async getIndex(type: Pbj.ItemType, includes: Pbj.ItemType[], rootIDs?: string[]): Promise<Pbj.Base[]> {
    const includeAlbums = includes ? includes.indexOf('album') >= 0 : undefined;
    const includeTracks = includes ? includes.indexOf('track') >= 0 : undefined;
    const includeEpisodes = includes ? includes.indexOf('episode') >= 0 : undefined;
    const includeFolders = includes ? includes.indexOf('folder') >= 0 : undefined;

    switch (type) {
      case 'root':
        return this.getRootSearch();
      case 'folder':
        return this.getFolderSearch(includeFolders, false, includeTracks, { sortField: 'title', rootIDs });
      case 'artist':
        return this.getArtistSearch(includeAlbums, includeTracks, { sortField: 'name', rootIDs });
      case 'album':
        return this.getAlbumSearch(includeTracks, { sortField: 'name', rootIDs });
      case 'track':
        return this.getTrackSearch({ sortField: 'title', rootIDs });
      case 'playlist':
        return this.getPlaylistSearch(includeTracks);
      case 'podcast':
        return this.getPodcastSearch(includeEpisodes, { sortField: 'title' });
      case 'episode':
        return this.getEpisodeSearch({ sortField: 'name' });
      default:
        throw new UnsupportedItemType(type);
    }
  }

  // TODO combine with getIndexEntry its a lot of same code
  async getIndexEntries(ids: string[], type: Pbj.ItemType, includes: Pbj.ItemIncludes[]): Promise<Pbj.Base[]> {
    console.log('load from server', ids, type, includes);
    const includeAlbums = includes ? includes.indexOf('album') >= 0 : undefined;
    const includeTracks = includes ? includes.indexOf('track') >= 0 : undefined;
    //    const includeEpisodes = includes ? includes.indexOf('episode') >= 0 : undefined;
    const includeSimilar = includes ? includes.indexOf('similar') >= 0 : undefined;
    const includeFolder = includes ? includes.indexOf('folder') >= 0 : undefined;
    switch (type) {
      case 'root':
        const jam_root = await this.serverApi.root.ids({ ids });
        return this.dataStore.updateIndexEntries(jam_root, 'root') as Pbj.Root[];
      case 'folder':
        const jam_folders = await this.serverApi.folder.ids({
          ids, folderSimilar: includeSimilar, folderChildren: includeFolder,
          folderInfo:         false, folderCounts: true, folderTracks: includeTracks,
          folderParents:      true
        });
        return this.dataStore.updateIndexEntries(jam_folders, 'folder') as Pbj.Folder[];
      case 'track':
        const jam_tracks = await this.serverApi.track.ids(JamParamFactory.p_tracks(ids));
        return this.dataStore.updateIndexEntries(jam_tracks, 'track');
      case 'album':
        return this.getAlbums(ids, includeTracks);
      case 'artist':
        return this.getArtists(ids, includeAlbums, includeTracks, includeSimilar);
      case 'playlist':
      case 'podcast':
      case 'episode':
      default:
        throw new UnsupportedItemType(type);
    }
  }

  async getIndexEntry(id: string, type: Pbj.ItemType, includes: Pbj.ItemIncludes[]): Promise<Pbj.Base> {
    console.log('load from server', id, type, includes);
    const includeAlbums = includes ? includes.indexOf('album') >= 0 : undefined;
    const includeTracks = includes ? includes.indexOf('track') >= 0 : undefined;
    const includeEpisodes = includes ? includes.indexOf('episode') >= 0 : undefined;
    const includeSimilar = includes ? includes.indexOf('similar') >= 0 : undefined;
    const includeFolder = includes ? includes.indexOf('folder') >= 0 : undefined;
    switch (type) {
      case 'root':
        const jam_root = await this.serverApi.root.id({ id });
        return this.dataStore.updateIndexEntry(jam_root, 'root') as Pbj.Root;
      case 'folder':
        const jam_folder = await this.serverApi.folder.id({
          id, folderSimilar: includeSimilar, folderChildren: includeFolder,
          folderInfo:        false, folderCounts: true, folderTracks: includeTracks,
          folderParents:     true
        });
        return this.dataStore.updateIndexEntry(jam_folder, 'folder') as Pbj.Folder;
      case 'track':
        const jam_track = await this.serverApi.track.id(JamParamFactory.p_track(id));
        return this.dataStore.updateIndexEntry(jam_track, 'track');
      case 'playlist':
        return this.getPlaylist(id, includeTracks);
      case 'podcast':
        return this.getPodcast(id, includeEpisodes);
      case 'episode':
        return this.getEpisode(id);
      case 'album':
        return this.getAlbum(id, includeTracks);
      case 'artist':
        return this.getArtist(id, includeAlbums, includeTracks, includeSimilar);
      default:
        throw new UnsupportedItemType(type);
    }
  }

  // <editor-fold desc="*** IndexEntry ***">

  private async getArtist(id: string, includeAlbums: boolean, includeTracks: boolean, includeSimilar = false): Promise<Pbj.Artist> {
    const jam_artist = await this.serverApi.artist.id(JamParamFactory.p_artist(id, includeAlbums, includeTracks, includeSimilar));
    return this.dataStore.updateIndexEntry(jam_artist, 'artist') as Pbj.Artist;
  }

  private async getArtists(ids: string[], includeAlbums: boolean, includeTracks: boolean, includeSimilar = false): Promise<Pbj.Artist[]> {
    const jam_artists = await this.serverApi.artist.ids(JamParamFactory.p_artists(ids, includeAlbums, includeTracks, includeSimilar));
    return this.dataStore.updateIndexEntries(jam_artists, 'artist') as Pbj.Artist[];
  }

  private async getAlbum(id: string, includeTracks: boolean): Promise<Pbj.Album> {
    const jam_album = await this.serverApi.album.id(JamParamFactory.p_album(id, includeTracks));
    return this.dataStore.updateIndexEntry(jam_album, 'album') as Pbj.Album;
  }

  private async getAlbums(ids: string[], includeTracks: boolean): Promise<Pbj.Album[]> {
    const jam_albums = await this.serverApi.album.ids(JamParamFactory.p_albums(ids, includeTracks));
    return this.dataStore.updateIndexEntries(jam_albums, 'album') as Pbj.Album[];
  }

  private async getPlaylist(id: string, includeTracks: boolean): Promise<Pbj.Playlist> {
    const jam_playlist = await this.serverApi.playlist.id(JamParamFactory.p_playlist(id, includeTracks));
    return this.dataStore.updateIndexEntry(jam_playlist, 'playlist') as Pbj.Playlist;
  }

  private async getPodcast(id: string, includeEpisodes: boolean): Promise<Pbj.Podcast> {
    const jam_podcast = await this.serverApi.podcast.id(JamParamFactory.p_podcast(id, includeEpisodes));
    return this.dataStore.updateIndexEntry(jam_podcast, 'podcast') as Pbj.Podcast;
  }

  private async getEpisode(id: string): Promise<Pbj.Episode> {
    const jam_episode = await this.serverApi.episode.id(JamParamFactory.p_episode(id));
    return this.dataStore.updateIndexEntry(jam_episode, 'episode') as Pbj.Episode;
  }

  // </editor-fold>

  // <editor-fold desc="*** Search ***">

  private async getRootSearch(): Promise<Pbj.Base[]> {
    const jam_roots = await this.serverApi.root.search(JamParamFactory.p_root_search());
    return this.dataStore.updateIndex(jam_roots.items, 'root');
  }

  private async getFolderSearch(folderChildren: boolean, folderSubfolders: boolean, folderTracks: boolean,
    query?: JamParameters.FolderSearchQuery, pagination?: JamParameters.Paginate): Promise<Pbj.Folder[]> {
    const jam_folders = await this.serverApi.folder.search(JamParamFactory.p_folder_search(folderChildren, folderSubfolders, folderTracks, query, pagination));
    return jam_folders.items.map(jam_folder => this.dataStore.updateIndexEntry(jam_folder, 'folder') as Pbj.Folder);
  }

  private async getArtistSearch(includeAlbums: boolean, includeTracks: boolean, query?: JamParameters.ArtistSearchQuery, pagination?: JamParameters.Paginate): Promise<Pbj.Artist[]> {
    const jam_artists = await this.serverApi.artist.search(JamParamFactory.p_artist_search(includeAlbums, includeTracks, query, pagination));
    return jam_artists.items
      .filter(jam_artist => jam_artist.albumCount > 0) // TODO: albumartist????? PLZ
      .map(jam_artist => this.dataStore.updateIndexEntry(jam_artist, 'artist') as Pbj.Artist);
  }

  private async getAlbumSearch(includesTracks: boolean, query?: JamParameters.AlbumSearch, pagination?: JamParameters.Paginate): Promise<Pbj.Album[]> {
    const jamAlbumList = await this.serverApi.album.search(JamParamFactory.p_album_search(includesTracks, query, pagination));
    return jamAlbumList.items.map(jamAlbum => this.dataStore.updateIndexEntry(jamAlbum, 'album') as Pbj.Album);
  }

  private async getTrackSearch(query?: JamParameters.TrackSearchQuery, pagination?: JamParameters.Paginate): Promise<Pbj.Track[]> {
    const jam_tracks = await this.serverApi.track.search(JamParamFactory.p_track_search(query, pagination));
    return jam_tracks.items.map(jam_track => this.dataStore.updateIndexEntry(jam_track, 'track') as Pbj.Track);
  }

  private async getPlaylistSearch(includeTracks: boolean): Promise<Pbj.Playlist[]> {
    const jam_playlists = await this.serverApi.playlist.search(JamParamFactory.p_playlist_search(includeTracks));
    return this.dataStore.updateIndex(jam_playlists.items, 'playlist') as Pbj.Playlist[];
  }

  private async getPodcastSearch(includeEpisodes: boolean, query?: JamParameters.PodcastSearchQuery, pagination?: JamParameters.Paginate): Promise<Pbj.Podcast[]> {
    const jam_podcasts = await this.serverApi.podcast.search(JamParamFactory.p_podcast_search(includeEpisodes, query, pagination));
    return this.dataStore.updateIndex(jam_podcasts.items, 'podcast') as Pbj.Podcast[];
  }

  private async getEpisodeSearch(query?: JamParameters.EpisodeSearchQuery, pagination?: JamParameters.Paginate): Promise<Pbj.Episode[]> {
    const jam_episodes = await this.serverApi.episode.search(JamParamFactory.p_episode_search(query, pagination));
    return this.dataStore.updateIndex(jam_episodes.items, 'episode') as Pbj.Episode[];
  }

  // FIXME: Search with regex or dont...
  public async search(value: string): Promise<Pbj.Base[]> {
    // TODO: root search if root becomes a valid item type
    const folderSearch = this.getFolderSearch(false, false, false, { title: `.*${value}.*` });
    const result = await Promise.all([folderSearch, folderSearch]);
    const anies = [].concat(...result);
    console.log(anies);
    return anies;
  }

  // </editor-fold>

  // <editor-fold desc="*** List ***">

  private async getFolderList(list: JamParameters.ListType, pagination?: JamParameters.Paginate): Promise<Pbj.Folder[]> {
    const jam_folders = await this.serverApi.folder.list(JamParamFactory.p_folder_list(list, undefined, pagination));
    return jam_folders.items.map(jam_folder => this.dataStore.updateIndexEntry(jam_folder, 'folder') as Pbj.Folder);
  }

  private async getArtistList(list: JamParameters.ListType, includeAlbums, includeTracks, pagination?: JamParameters.Paginate): Promise<Pbj.Artist[]> {
    const jam_artists = await this.serverApi.artist.list(JamParamFactory.p_artist_list(list, includeAlbums, includeTracks, undefined, pagination));
    return jam_artists.items.map(jam_artist => this.dataStore.updateIndexEntry(jam_artist, 'artist') as Pbj.Artist);
  }

  private async getAlbumList(list: JamParameters.ListType, includeTracks: boolean, pagination?: JamParameters.Paginate): Promise<Pbj.Album[]> {
    const jam_albums = await this.serverApi.album.list(JamParamFactory.p_album_list(list, includeTracks, undefined, pagination));
    return jam_albums.items.map(jam_album => this.dataStore.updateIndexEntry(jam_album, 'album') as Pbj.Album);
  }

  private async getTrackList(list: JamParameters.ListType, pagination?: JamParameters.Paginate): Promise<Pbj.Track[]> {
    const jam_tracks = await this.serverApi.track.list(JamParamFactory.p_track_list(list, undefined, pagination));
    return jam_tracks.items.map(jam_track => this.dataStore.updateIndexEntry(jam_track, 'track') as Pbj.Track);
  }

  private async getEpisodeList(list: JamParameters.ListType): Promise<Pbj.Episode[]> {
    const jam_episodes = await this.serverApi.episode.list(JamParamFactory.p_episode_list(list));
    return jam_episodes.items.map(jam_episode => this.dataStore.updateIndexEntry(jam_episode, 'episode') as Pbj.Episode);
  }

  // </editor-fold>

  // <editor-fold desc="*** Action ***">

  /**
   * TODO: here something changed in the api
   * @param item
   */
  async star(item: Pbj.Base): Promise<void> {
    //    await this.serverApi.bookmark.id({ id: item.id });
    this.dataStore.updateFav(item, true);
  }

  /**
   * TODO: here something changed in the api
   * @param item
   */
  async unstar(item: Pbj.Base): Promise<void> {
    //    await this.serverApi.bookmark.delete({ id: item.id });
    this.dataStore.updateFav(item, false);
  }

  async createPlaylist(name: string, trackIDs: string[], comment?: string, isPublic = false): Promise<Pbj.Playlist> {
    const jam_playlist = await this.serverApi.playlist.create({ name, comment, isPublic, trackIDs });
    return this.dataStore.updateIndexEntry(jam_playlist, 'playlist') as Pbj.Playlist;
  }

  async createPodcast(url: string): Promise<Pbj.Podcast> {
    const jam_podcast = await this.serverApi.podcast.create({ url }); // create
    return this.dataStore.updateIndexEntry(jam_podcast, 'podcast') as Pbj.Podcast; // clear cache ?? TODO: woot clear??
  }

  async deletePodcast(id: string): Promise<void> {
    return this.serverApi.podcast.delete({ id }); // delete TODO: update datastore
  }

  async refreshPodcast(id: string): Promise<void> {
    return this.serverApi.podcast.refresh({ id });
  }

  getImageUrl(id: string, size: number): string {
    return this.serverApi.image.url(id, size);
  }

  getDownloadUrl(id: string, format?: JamParameters.DownloadFormatType): string {
    return this.serverApi.media.download_url(id, format);
  }

  getStreamUrl(id: string, format?: JamParameters.AudioFormatType) {
    return this.serverApi.media.stream_url(id, format);
  }

  async refreshPodcasts(): Promise<void> {
    console.log('445: refreshPodcasts');
    return this.serverApi.podcast.refreshAll();
  }

  async retrieveEpisode(id: string): Promise<void> {
    console.log('483: refreshEpisode');
    return this.serverApi.episode.retrieve({ id });
  }

  // </editor-fold>

  async addToPlaylist(id: string, trackIDs: string[]): Promise<void> {
    return this.serverApi.playlist.update(JamParamFactory.p_playlist_update(id, trackIDs));
  }

  async getStats() {
    return this.serverApi.various.stats({});
  }

  // TODO: debug only
  getServerApi() {
    return this.serverApi;
  }
}
