import {Jam} from '../../jam';
import {UnsupportedIndexType} from '../../model/errors';
import {Pbj} from '../../model/model';
import {Storage} from '@ionic/storage';

/** Storage key used for the data */
const INDEX_KEY = 'jam-index';

export class PbjDataStore {

  private dataStore: {
    readonly artistIndex: Pbj.ItemMap<Pbj.Artist>;
    readonly playlistIndex: Pbj.ItemMap<Pbj.Playlist>;
    readonly albumIndex: Pbj.ItemMap<Pbj.Album>;
    readonly trackIndex: Pbj.ItemMap<Pbj.Track>;
    readonly folderIndex: Pbj.ItemMap<Pbj.Folder>;
    readonly rootIndex: Pbj.ItemMap<Pbj.Root>;
    readonly episodeIndex: Pbj.ItemMap<Pbj.Episode>;
    readonly podcastIndex: Pbj.ItemMap<Pbj.Podcast>;
    readonly listCache: Pbj.ListMap;
    readonly inSync: { [key in Pbj.IndexType]: boolean };
  } = {
    playlistIndex: {},
    artistIndex:   {},
    albumIndex:    {},
    trackIndex:    {},
    folderIndex:   {},
    rootIndex:     {},
    podcastIndex:  {},
    episodeIndex:  {},
    listCache:     {},
    inSync:        {
      root: false, folder: false, artist: false, album: false, track: false, playlist: false, podcast: false, episode: false
    }
  };

  constructor(private storage: Storage) {
  }

  // <editor-fold desc="*** Stuff ***">

  /**
   * Load the data from the Storage Service (Offline usage)
   * @next-version
   */
  load(): void {
    // return this.storage.get(INDEX_KEY).then((value) => {
    // 	if (value) {
    // 		this.dataStore = value;
    // 	}
    // });
  }

  /**
   * Stores the current data in the Storage Service
   */
  async save(): Promise<any> {
    return this.storage.set(INDEX_KEY, this.dataStore);
  }

  updateFav(item: Pbj.Base, isFaved: boolean): void {
    item.state = item.state || this.createState();
    item.state.faved = isFaved ? Date.now() : undefined;
  }

  // </editor-fold>

  // <editor-fold desc="*** Get Or Create Base Objects ***">

  private createState(): Jam.State {
    return { faved: undefined, lastplayed: undefined, played: undefined, rated: undefined };
  }

  private getOrCreateRootFolder(id: string): Pbj.Root {
    return this.dataStore.rootIndex[id] = this.dataStore.rootIndex[id] || {
      id,
      name:      '',
      created:   Date.now(),
      path:      '',
      status:    { error: null, lastScan: -1, scanning: false },
      item_type: 'root',
      strategy:  'auto',
      state:     undefined
    };
  }

  private getOrCreateFolder(id: string): Pbj.Folder {
    return this.dataStore.folderIndex[id] = this.dataStore.folderIndex[id] || {
      id,
      level:      0,
      trackCount: 0,
      name:       '',
      created:    Date.now(),
      type:       'unknown',
      item_type:  'folder'
    };
  }

  private getOrCreateArtist(id: string): Pbj.Artist {
    return this.dataStore.artistIndex[id] = this.dataStore.artistIndex[id] || {
      id,
      name:        '',
      created:     Date.now(),
      albumCount:  -1,
      trackCount:  -1,
      albumTypes:  [],
      item_type:   'artist',
      seriesCount: -1
    };
  }

  private getOrCreateAlbum(id: string): Pbj.Album {
    return this.dataStore.albumIndex[id] = this.dataStore.albumIndex[id] || {
      id,
      name:       '',
      duration:   -1,
      created:    Date.now(),
      albumType:  'unknown',
      trackCount: -1,
      artistID:   null,
      item_type:  'album'
    };
  }

  private getOrCreateTrack(id: string): Pbj.Track {
    return this.dataStore.trackIndex[id] = this.dataStore.trackIndex[id] || {
      id,
      name:      '',
      created:   Date.now(),
      duration:  -1,
      parentID:  null,
      item_type: 'track'
    };
  }

  private getOrCreatePlaylist(id: string): Pbj.Playlist {
    return this.dataStore.playlistIndex[id] = this.dataStore.playlistIndex[id] || {
      id,
      item_type:  'playlist',
      changed:    0,
      comment:    '',
      created:    0,
      duration:   0,
      isPublic:   false,
      name:       '',
      state:      undefined,
      trackCount: 0,
      trackIDs:   undefined,
      userID:     ''
    };
  }

  private getOrCreatePodcast(id: string): Pbj.Podcast {
    return this.dataStore.podcastIndex[id] = this.dataStore.podcastIndex[id] || {
      id,
      item_type: 'podcast',
      name:      '',
      created:   null,
      status:    null,
      url:       null
    };
  }

  private getOrCreateEpisode(id: string): Pbj.Episode {
    return this.dataStore.episodeIndex[id] = this.dataStore.episodeIndex[id] || {
      id,
      item_type: 'episode',
      created:   null,
      status:    null,
      date:      null,
      duration:  0,
      parentID:  null,
      podcastID: null,
      name:      '',
      podcast:   null
    };
  }

  // </editor-fold>

  // <editor-fold desc="*** List ***">

  private getOrCreateList(list: Pbj.ListType, type: Pbj.ItemType): Pbj.Base[] {
    return this.getOrCreateTypeCache(this.getOrCreateListCache(list), type);
  }

  private getOrCreateListCache(list: Pbj.ListType): Pbj.TypeMap {
    return this.dataStore.listCache[list] || (this.dataStore.listCache[list] = {});
  }

  private getOrCreateTypeCache(listCache, type: Pbj.ItemType): Pbj.Base[] {
    return listCache[type] || (listCache[type] = []);
  }

  private hasList(list: Pbj.ListType, type: Pbj.ItemType): boolean {
    return !!this.dataStore.listCache[list] && !!this.dataStore.listCache[list][type]; // check if object was created
  }

  private getList(list: Pbj.ListType, type: Pbj.ItemType): Pbj.Base[] {
    return this.getOrCreateList(list, type);
  }

  checkList(list: Pbj.ListType, type: Pbj.ItemType, force = false): Pbj.Base[] {
    return this.hasList(list, type) && !force ? this.getList(list, type) : undefined;
  }

  updateList(list: Pbj.ListType, type: Pbj.ItemType, items: any): Pbj.Base[] {
    const listCache = this.getOrCreateList(list, type);
    listCache.splice(0);
    listCache.push(...items);
    return listCache;
  }

  clearList(list: Pbj.ListType): void {
    delete this.dataStore.listCache[list];
  }

  clearListSpecific(list: Pbj.ListType, type: Pbj.ItemType): void {
    if (this.hasList(list, type)) {
      delete this.dataStore.listCache[list][type];
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Index ***">

  private hasIndex(type: Pbj.IndexType): boolean {
    return this.dataStore.inSync[type];
  }

  private getIndex(type: Pbj.IndexType): Pbj.Base[] {
    return Object.values(this.index(type));
  }

  private index(type: Pbj.IndexType): Pbj.ItemMap<Pbj.Base> {
    switch (type) {
      case 'folder':
        return this.dataStore.folderIndex;
      case 'track':
        return this.dataStore.trackIndex;
      case 'playlist':
        return this.dataStore.playlistIndex;
      case 'podcast':
        return this.dataStore.podcastIndex;
      case 'episode':
        return this.dataStore.episodeIndex;
      case 'album':
        return this.dataStore.albumIndex;
      case 'artist':
        return this.dataStore.artistIndex;
      case 'root':
        return this.dataStore.rootIndex;
      default:
        throw new UnsupportedIndexType(type);
    }
  }

  checkIndex(type: Pbj.IndexType, force = false): Pbj.Base[] {
    return this.hasIndex(type) && !force ? this.getIndex(type) : undefined;
  }

  updateIndex(jamItems: Jam.Base[], type: Pbj.ItemType): Pbj.Base[] {
    this.dataStore.inSync[type] = true;
    return jamItems.map(jamItem => this.updateIndexEntry(jamItem, type))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  clearIndex(type: Pbj.IndexType): void {
    const index = this.index(type);
    for (const key in index) {
      if (index.hasOwnProperty(key)) {
        delete index[key];
      }
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Index Entry ***">

  private hasIndexEntries(ids: string[], type: Pbj.IndexType, includes: Pbj.ItemIncludes[]): boolean {
    return ids.reduce((prev, current) => prev && this.hasIndexEntry(current, type, includes), true);
  }

  private hasIndexEntry(id: string, type: Pbj.IndexType, includes: Pbj.ItemIncludes[]): boolean {
    const entry = this.getIndexEntry(id, type);
    let result = !!entry.name.length; // is empty for a newly generated entry
    if (result && !!includes) {
      const includeAlbums = includes ? includes.indexOf('album') >= 0 : undefined;
      const includeTracks = includes ? includes.indexOf('track') >= 0 : undefined;
      const includeSimilar = includes ? includes.indexOf('similar') >= 0 : undefined;
      switch (type) {
        case 'folder':
          const includeFolder = includes ? includes.indexOf('folder') >= 0 : undefined;
          result = !includeFolder || !!(entry as Pbj.Folder).folders;
          break;
        case 'artist':
          result = (!includeAlbums || !!(entry as Pbj.Artist).albums)
            && !includeTracks || !!(entry as Pbj.Artist).tracks
            && !includeSimilar || !!(entry as Pbj.Artist).similar;
          break;
        case 'album':
          result = !includeTracks || !!(entry as Pbj.Album).tracks;
          break;
        case 'playlist':
          result = !includeTracks || !!(entry as Pbj.Playlist).tracks;
          break;
        case 'podcast':
          const includeEpisode = includes ? includes.indexOf('episode') >= 0 : undefined;
          result = !includeEpisode || !!(entry as Pbj.Podcast).episodes;
          break;
        case 'root':
        case 'episode':
        case 'track':
          break;
        default:
          throw new UnsupportedIndexType(type);
      }
    }
    return result;
  }

  private getIndexEntries(ids: string[], type: Pbj.IndexType): Pbj.Base[] {
    return ids.map(id => this.getIndexEntry(id, type));
  }

  private getIndexEntry(id: string, type: Pbj.IndexType): Pbj.Base {
    switch (type) {
      case 'root':
        return this.getOrCreateRootFolder(id);
      case 'folder':
        return this.getOrCreateFolder(id);
      case 'track':
        return this.getOrCreateTrack(id);
      case 'playlist':
        return this.getOrCreatePlaylist(id);
      case 'podcast':
        return this.getOrCreatePodcast(id);
      case 'episode':
        return this.getOrCreateEpisode(id);
      case 'album':
        return this.getOrCreateAlbum(id);
      case 'artist':
        return this.getOrCreateArtist(id);
      default:
        throw new UnsupportedIndexType(type);
    }
  }

  checkIndexEntry(id: string, type: Pbj.IndexType, includes: Pbj.ItemIncludes[], force = false): Pbj.Base {
    return !force && this.hasIndexEntry(id, type, includes) ? this.getIndexEntry(id, type) : undefined;
  }

  checkIndexEntries(ids: string[], type: Pbj.IndexType, includes: Pbj.ItemIncludes[], force = false): Pbj.Base[] {
    return !force && this.hasIndexEntries(ids, type, includes) ? this.getIndexEntries(ids, type) : undefined;
  }

  updateIndexEntry(jam_item: Jam.Base, type: Pbj.IndexType): Pbj.Base {
    switch (type) {
      case 'root':
        return this.dataStore.rootIndex[jam_item.id] = Object.assign(this.getOrCreateRootFolder(jam_item.id), jam_item);
      case 'folder':
        const jam_folder = jam_item as Jam.Folder;
        const pbj_folder = this.dataStore.folderIndex[jam_folder.id] = Object.assign(this.getOrCreateFolder(jam_folder.id), jam_folder);
        pbj_folder.folders = jam_folder.folders ? jam_folder.folders.map(folder => this.updateIndexEntry(folder, 'folder') as Pbj.Folder) : pbj_folder.folders;
        pbj_folder.tracks = jam_folder.tracks ? jam_folder.tracks.map(track => this.updateIndexEntry(track, 'track') as Pbj.Track) : pbj_folder.tracks;
        return this.dataStore.folderIndex[jam_folder.id] = pbj_folder;
      case 'track':
        return this.dataStore.trackIndex[jam_item.id] = Object.assign(this.getOrCreateTrack(jam_item.id), jam_item);
      case 'playlist':
        const jam_playlist = jam_item as Jam.Playlist;
        const pbj_playlist
                = this.dataStore.playlistIndex[jam_playlist.id]
          = Object.assign(this.getOrCreatePlaylist(jam_playlist.id), jam_playlist);
        pbj_playlist.tracks = jam_playlist.tracks
          ? jam_playlist.tracks.map(track => this.updateIndexEntry(track, 'track') as Pbj.Track)
          : pbj_playlist.tracks;
        return this.dataStore.playlistIndex[jam_playlist.id] = pbj_playlist;
      case 'podcast':
        const jam_podcast = jam_item as Jam.Podcast;
        // special status adjustments needed
        let pbj_podcast = this.getOrCreatePodcast(jam_podcast.id);
        const oldPodStatus = pbj_podcast.status;
        // @ts-ignore override the pbj_podcast.episodes for just a moment ;)
        pbj_podcast = { ...pbj_podcast, ...jam_podcast };
        pbj_podcast.episodes = jam_podcast.episodes
          ? jam_podcast.episodes
            .map(episode => this.updateIndexEntry(episode, 'episode') as Pbj.Episode)
            .sort((a, b) => a.date - b.date)
          : pbj_podcast.episodes;
        // special status adjustments needed (keep refreshing while new)
        if (oldPodStatus === 'refreshing' && pbj_podcast.status === 'new') { pbj_podcast.status = 'refreshing'; }
        return this.dataStore.podcastIndex[jam_podcast.id] = pbj_podcast;
      case 'episode':
        const jam_episode = jam_item as Jam.PodcastEpisode;
        let pbj_episode = this.getOrCreateEpisode(jam_episode.id);
        const oldEpiStatus = pbj_episode.status;
        pbj_episode = this.dataStore.episodeIndex[jam_episode.id] = { ...pbj_episode, ...jam_episode };
        // special status adjustments needed
        if (oldEpiStatus === 'refreshing' && pbj_episode.status === 'new') { pbj_episode.status = 'refreshing'; }
        return pbj_episode;
      case 'album':
        const jam_album = jam_item as Jam.Album;
        const pbj_album = Object.assign(this.getOrCreateAlbum(jam_album.id), jam_album); // apply base values
        pbj_album.tracks = jam_album.tracks
          ? jam_album.tracks
            .map(track => this.updateIndexEntry(track, 'track') as Pbj.Track)
            .sort((a, b) => (a.tag.trackNr ? a.tag.trackNr : 0) - (b.tag.trackNr ? b.tag.trackNr : 0))
          : pbj_album.tracks;
        return this.dataStore.albumIndex[jam_album.id] = pbj_album;
      case 'artist':
        const jam_artist = jam_item as Jam.Artist;
        const pbj_artist = this.dataStore.artistIndex[jam_artist.id] = Object.assign(this.getOrCreateArtist(jam_artist.id), jam_artist);
        pbj_artist.albums = jam_artist.albums
          ? jam_artist.albums
            .map(album => this.updateIndexEntry(album, 'album') as Pbj.Album)
          : pbj_artist.albums;
        pbj_artist.tracks = jam_artist.tracks
          ? jam_artist.tracks
            .map(track => this.updateIndexEntry(track, 'track') as Pbj.Track)
            .sort((a, b) => (a.tag.trackNr ? a.tag.trackNr : 0) - (b.tag.trackNr ? b.tag.trackNr : 0))
          : pbj_artist.tracks;
        pbj_artist.similar = jam_artist.similar
          ? jam_artist.similar
            .map(similar => this.updateIndexEntry(similar, 'artist') as Pbj.Artist)
          : pbj_artist.similar;
        return this.dataStore.artistIndex[jam_artist.id] = pbj_artist;
      default:
        throw new UnsupportedIndexType(type);
    }
  }

  updateIndexEntries(jam_items: Jam.Base[], type: Pbj.IndexType): Pbj.Base[] {
    return jam_items.map(item => this.updateIndexEntry(item, type));
  }

  clearIndexEntry(id: string, type: Pbj.ItemType): void {
    delete this.index(type)[id];
  }

  // </editor-fold>

  indexSync(type: Pbj.ItemType, inSync: boolean): void {
    this.dataStore.inSync[type] = inSync;
  }
}
