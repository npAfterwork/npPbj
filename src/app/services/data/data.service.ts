import {JamService} from '../../jam';
import {UnsupportedItemType} from '../../model/errors';
import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {SpinnerService} from '../../modules/la-rnd-spinner/spinner.service';
import {FilterService} from '../ui/filter.service';
import {DataServiceProxy} from './data.service.proxy';
import {PbjDataStore} from './datastore.model';
import {distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

const CACHE_DISABLED = true; // root folder filter is not working though

/**
 * The Data Provider transforms the UnifiedServerAPI into the Jam Data Model
 * If we store this data worst case we hold the full database in memory............. How much is this???
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly dataStore: PbjDataStore;

  private readonly _proxy: DataServiceProxy;

  get proxy(): DataServiceProxy {
    if (this.offline) { throw new Error('Can not access server in offline mode!!!'); } // TODO: this does not work need offline proxy
    return this._proxy;
  }

  // <editor-fold desc="*** Distributor ***">

  private _polling: Subject<boolean> = new Subject();
  public readonly isPolling$ = this._polling.asObservable();

  private _sublistDistributor: Pbj.SubListDistributor = {
    artistAlbums:    new BehaviorSubject<Pbj.Album[]>(null),
    artistTracks:    new BehaviorSubject<Pbj.Track[]>(null),
    albumTracks:     new BehaviorSubject<Pbj.Track[]>(null),
    podcastEpisodes: new BehaviorSubject<Pbj.Episode[]>(null),
    folderChildren:  new BehaviorSubject<Pbj.Base[]>(null),
    folderTracks:    new BehaviorSubject<Pbj.Base[]>(null),
    playlistTracks:  new BehaviorSubject<Pbj.Track[]>(null),
    artistTopTracks: new BehaviorSubject<Pbj.Track[]>(null),
    similarArtists:  new BehaviorSubject<Pbj.Artist[]>(null)
  };

  // changed to subject to stop flickering because of prev value...
  private _indexDistributor: Pbj.IndexDistributor = {
    root:     new Subject<Pbj.Base[]>(),
    artist:   new Subject<Pbj.Base[]>(),
    album:    new Subject<Pbj.Base[]>(),
    track:    new Subject<Pbj.Base[]>(),
    folder:   new Subject<Pbj.Base[]>(),
    playlist: new Subject<Pbj.Base[]>(),
    podcast:  new Subject<Pbj.Base[]>(),
    episode:  new Subject<Pbj.Base[]>()
  };

  private _itemDistributor: Pbj.ItemDistributor = {
    root:     new BehaviorSubject<Pbj.Base>(null),
    artist:   new BehaviorSubject<Pbj.Base>(null),
    album:    new BehaviorSubject<Pbj.Base>(null),
    track:    new BehaviorSubject<Pbj.Base>(null),
    folder:   new BehaviorSubject<Pbj.Base>(null),
    playlist: new BehaviorSubject<Pbj.Base>(null),
    podcast:  new BehaviorSubject<Pbj.Base>(null),
    episode:  new BehaviorSubject<Pbj.Base>(null)
  };

  private _listDistributor: Pbj.ListDistributor = {
    faved:      new BehaviorSubject<Pbj.Base[]>(null),
    frequent:   new BehaviorSubject<Pbj.Base[]>(null),
    highest:    new BehaviorSubject<Pbj.Base[]>(null),
    avghighest: new BehaviorSubject<Pbj.Base[]>(null),
    random:     new BehaviorSubject<Pbj.Base[]>(null),
    newest:     new BehaviorSubject<Pbj.Base[]>(null),
    recent:     new BehaviorSubject<Pbj.Base[]>(null)
  };

  // </editor-fold>

  offline = false;

  private _playqueue: Pbj.Track[] = [];

  private pollingMap: (() => void)[] = [];
  //  private imageCache = {};
  private progress: BehaviorSubject<Pbj.Progress> = new BehaviorSubject<Pbj.Progress>(null);
  progress$ = this.progress.asObservable();

  constructor(
    private readonly storage: Storage,
    private readonly serverApi: JamService,
    private readonly filterService: FilterService,
    private readonly spinner: SpinnerService
  ) {
    console.log('Hello Data Provider', filterService);
    this.dataStore = new PbjDataStore(storage);
    this._proxy = new DataServiceProxy(serverApi, this.dataStore);
  }

  startRequest() {
    console.log('SPINN Already');
    this.spinner.show().catch(e => console.error(e));
  }

  endRequest() {
    console.log('SPINN dont do it');
    this.spinner.hide().catch(e => console.error(e));
  }

  index$(type: Pbj.IndexType): Subject<Pbj.Base[]> {
    return this.indexDistributor(type);
  }

  async getIndex<T extends Pbj.Base>(type: Pbj.ItemType, includes?: Pbj.ItemType[], force = CACHE_DISABLED): Promise<T[]> {
    this.startRequest();
    const pbj_items = this.dataStore.checkIndex(type, force) || await this.proxy.getIndex(type, includes, this.filterService.getRootFilter());
    // .filter(folder => !(<Pbj.Folder>folder).parentID) // return only root folders
    // .sort((a, b) => a.name.localeCompare(b.name));
    this.dataStore.indexSync(type, true);
    // console.log(pbj_items);
    this.indexDistributor(type).next(pbj_items);
    this.endRequest();
    return pbj_items as T[];
  }

  item$(type: Pbj.ItemType): BehaviorSubject<Pbj.Base> {
    return this.itemDistributor(type);
  }

  async getItem<T extends Pbj.Base>(id: string, type: Pbj.ItemType, includes?: Pbj.ItemIncludes[], doNotDistribute = false, force = CACHE_DISABLED): Promise<T> {
    this.startRequest();
    const pbj_item = this.dataStore.checkIndexEntry(id, type, includes, force) || await this.proxy.getIndexEntry(id, type, includes);
    // console.log('189: getItem', pbj_item);
    if (!doNotDistribute) { this.distributeItem(pbj_item); }
    this.endRequest();
    return pbj_item as T;
  }

  list$(type: Pbj.ListType): BehaviorSubject<Pbj.Base[]> {
    return this.listDistributor(type);
  }

  async getList(type: Pbj.ItemType, list: Pbj.ListType, includes?: Pbj.ItemType[], force = CACHE_DISABLED): Promise<Pbj.Base[]> {
    this.startRequest();
    const pbj_items = this.dataStore.checkList(list, type, force) || await this.proxy.getList(list, type, includes);
    this.listDistributor(list).next(pbj_items);
    this.endRequest();
    return pbj_items;
  }

  async getAdditionalListItems(type: Pbj.ItemType, list: Pbj.ListType, offset = 0, amount = 20, includes?: Pbj.ItemType[]): Promise<Pbj.Base[]> {
    this.startRequest();
    const items = this.proxy.getList(list, type, includes, offset, amount);
    this.endRequest();
    return items;
  }

  sublist$(type: Pbj.SubListType): Observable<Pbj.Base[]> {
    return this.subListDistributor(type).pipe(distinctUntilChanged());
  }

  // <editor-fold desc="*** Utils ***">
  private subListDistributor(type: Pbj.SubListType): BehaviorSubject<Pbj.Base[]> {
    return this._sublistDistributor[type];
  }

  private indexDistributor(type: Pbj.IndexType): Subject<Pbj.Base[]> {
    return this._indexDistributor[type];
  }

  private itemDistributor(type: Pbj.ItemType): BehaviorSubject<Pbj.Base> {
    return this._itemDistributor[type];
  }

  private listDistributor(list: Pbj.ListType): BehaviorSubject<Pbj.Base[]> {
    return this._listDistributor[list];
  }

  private distributeItem(pbj_item: Pbj.Base): void {
    this.itemDistributor(pbj_item.item_type).next(pbj_item);
    switch (pbj_item.item_type) {
      case 'folder':
        const folder = (pbj_item as Pbj.Folder);
        this.subListDistributor('folderChildren').next([...folder.folders]);
        this.subListDistributor('folderTracks').next([...folder.tracks]);
        break;
      case 'artist':
        const artist = pbj_item as Pbj.Artist;
        this.subListDistributor('artistAlbums').next(artist.albums);
        this.subListDistributor('artistTracks').next(artist.tracks);
        this.subListDistributor('artistTopTracks').next(Utils.getTopRated(artist.tracks, 7));
        this.subListDistributor('similarArtists').next(artist.similar);
        break;
      case 'album':
        this.subListDistributor('albumTracks').next((pbj_item as Pbj.Album).tracks);
        break;
      case 'podcast':
        this.subListDistributor('podcastEpisodes').next((pbj_item as Pbj.Podcast).episodes);
        break;
      case 'playlist':
        this.subListDistributor('playlistTracks').next((pbj_item as Pbj.Playlist).tracks);
        break;
      case 'root':
      case 'track':
      case 'episode':
        break;
      default:
        throw new UnsupportedItemType(pbj_item.item_type);
    }
  }

  /**
   * Load the data from the Storage Service (Offline usage)
   * Load the main indexes from the Server (Online usage)
   * Save for offline usage in the end
   */
  async load(): Promise<void> {
    this.dataStore.load();
    if (!this.offline) {
      // console.log('Refreshing Podcasts');
      // await this.proxy.refreshPodcasts();
      // await this.getRootFolderIndex(true);
    }
  }

  /**
   * Stores the current data in the Storage Service
   */
  async save(): Promise<any> {
    return this.dataStore.save();
  }

  // </editor-fold>

  // <editor-fold desc="*** State ***">

  async star(item: Pbj.Base): Promise<void> {
    await this.proxy.star(item);
  }

  async unstar(item: Pbj.Base): Promise<void> {
    await this.proxy.unstar(item);
  }

  async getAllStarred(): Promise<void> {
    const fav_tracks = await this.getList('track', 'faved', []);
    const fav_albums = await this.getList('album', 'faved', ['track']);
    const fav_folders = await this.getList('folder', 'faved', ['folder']);
    const fav_artists = await this.getList('artist', 'faved', ['album', 'track']);
    console.log(fav_tracks, fav_albums, fav_folders, fav_artists);
  }

  // </editor-fold>

  async createPlaylist(name: string, trackIDs: string[], comment?: string, isPublic = false): Promise<Pbj.Playlist> {
    const pbj_playlists = await this.proxy.createPlaylist(name, trackIDs, comment, isPublic);
    console.log(pbj_playlists);
    return pbj_playlists;
  }

  async createPodcast(url: string): Promise<void> {
    await this.proxy.createPodcast(url);
    // Force Update
    this.getIndex('podcast', [], true).catch(e => console.error(e));
  }

  async deletePodcast(id: string): Promise<void> {
    await this.proxy.deletePodcast(id);
    this.dataStore.clearIndex('podcast'); // clear cache
    // Force Update
    this.getIndex('podcast', [], true).catch(e => console.error(e));
  }

  //

  async getPlayQueue(): Promise<Pbj.Track[]> {
    // TODO: not working yet
    // const playQueue = await this.serverApi.playqueue_get({
    // 																											 playQueueTracks:   true,
    // 																											 playQueueTrackIDs: true
    // 																										 });
    // console.log(playQueue, 'Queue');
    return this._playqueue;
  }

  async updatePlayQueue(tracks: Pbj.Track[]): Promise<Pbj.Track[]> {
    this._playqueue = tracks;
    // TODO: not working yet
    // const playQueue = await this.serverApi.playqueue_get({
    // 																											 playQueueTracks:   true,
    // 																											 playQueueTrackIDs: true
    // 																										 });
    // console.log(playQueue, 'Queue');
    return this._playqueue;
  }

  // <editor-fold desc="*** Images ***">

  //
  // /**
  //  * Get the Random Track list from the server and distribute the received data to the randomTracks$ channel.
  //  * @channel randomTracks$
  //  */
  // getRandomTrackList(count: number = 500): Observable<Pbj.Track[]> {
  // 	return this.serverApi.getRandomTracks(count)
  // 		.pipe(map(value => {
  // 				const Tracks = value.map(Track => this.dataStore.updateTrackIndex(Track));
  // 				this.progress.next({type: 'report', textID: 'TEXT Random', count: 1});
  // 				this.randomTracks$.next(Tracks);
  // 				return Tracks;
  // 			}),
  // 		);
  // }
  //
  // /**
  //  * Get the Cover Art Url
  //  * @param {string} id The ID of a folder, album or artist.
  //  * @param {number} size If specified, scale image to this size.
  //  */
  // getCoverUrl(id: string, size: number = 40): string {
  // 	return id ? this.serverApi.getCoverArt(id, size) as string : null;
  // }
  //
  /**
   * Get the Cover Art Url
   * @param {string} id The ID of a folder, album or artist.
   * @param {number} size If specified, scale image to this size.
   */
  getImageUrl(id: string, size = 40): string {
    return id ? this.proxy.getImageUrl(id, size) : null;
  }

  //
  // // TODO: this is not wworking no way
  //  getImageByUrl(url: string) {
  // let imageCacheElement = this.imageCache[url];
  // if (imageCacheElement) {
  // 	return of(imageCacheElement);
  // } else {
  // 	return this.serverApi.image_binary(url)
  // 		.pipe(
  // 			map(blob => {
  // 				console.log(blob);
  // 				if (blob.type === 'application/json') {
  // 					const unsafeImageUrl = '/assets/img/audio-folder-icon.png';
  // 					return this.imageCache[url] = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  // 				} else {
  // 					const unsafeImageUrl = URL.createObjectURL(blob);
  // 					return this.imageCache[url] = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  // 				}
  // 			}),
  // 		);
  // }
  //  }

  // </editor-fold>

  // private realItemTemplate(pbj_item: Pbj.Base) {
  // 	switch (pbj_item.item_type) {
  // 		case 'root':
  // 			const root = <Pbj.Root>pbj_item;
  // 			break;
  // 		case 'folder':
  // 			const folder = <Pbj.Folder>pbj_item;
  // 			break;
  // 		case 'artist':
  // 			const artist = <Pbj.Artist>pbj_item;
  // 			break;
  // 		case 'album':
  // 			const album = <Pbj.Album>pbj_item;
  // 			break;
  // 		case 'track':
  // 			const track = <Pbj.Track>pbj_item;
  // 			break;
  // 		case 'playlist':
  // 			const playlist = <Pbj.Playlist>pbj_item;
  // 			break;
  // 		case 'podcast':
  // 			const podcast = <Pbj.Podcast>pbj_item;
  // 			break;
  // 		case 'episode':
  // 			const episode = <Pbj.Episode>pbj_item;
  // 			break;
  // 	}
  // }

  private poll(callback: () => Promise<boolean>, onInterrupt: () => void, timeout = 10000): number {
    const pollingID = window.setTimeout(async () => {
      console.log('poll', pollingID);
      delete this.pollingMap[pollingID]; // clear current polling ID
      if (!await callback()) {
        this.poll(callback, onInterrupt, timeout);
      }
    }, timeout);
    this.pollingMap[pollingID] = onInterrupt;
    this._polling.next(true);
    console.log(this.pollingMap, 'polling ids');
    return pollingID;
  }

  stopPolling(): void {
    this.pollingMap.forEach((onInterrupt, id) => {
      window.clearTimeout(id);
      onInterrupt();
    });
    this.pollingMap = [];
  }

  // <editor-fold desc="*** Refresh all Podcasts ***">
  /** Set status to refreshing where needed and return changed podcasts   */
  private updatePodcastStatus(podcasts: Pbj.Podcast[]): Pbj.Podcast[] {
    return podcasts ? podcasts.reduce((changed, podcast) => {
      const needRefresh = podcast.status !== 'completed' && podcast.status !== 'refreshing';
      if (needRefresh) {
        changed.push(podcast);
        podcast.status = 'refreshing';
        this.proxy.refreshPodcast(podcast.id).catch(e => console.error(e));
      }
      return changed;
    }, []) : [];
  }

  private pollForPodcastsStatus(timeout): void {
    this.poll(
      async () => {
        console.log('checking podcast again');
        const refreshed: Pbj.Podcast[] = await this.getIndex<Pbj.Podcast>('podcast', [], true); // force database update
        return refreshed.reduce((allDone, episode) => allDone && (episode.status === 'completed' || episode.status === 'error'), true); // return doStop;
      },
      () => {
        // reset refreshing state to new TODO: set state to aborted
        const current = this.dataStore.checkIndex('podcast') as Pbj.Podcast[];
        if (current) {
          current.forEach(podcast => podcast.status = podcast.status === 'refreshing' ? 'new' : podcast.status);
          this.indexDistributor('podcast').next(current); // Redistribute with new state
        }
      },
      timeout
    );
  }

  async refreshPodcasts(timeout = 15000): Promise<void> {
    const podcasts: Pbj.Podcast[] = this.dataStore.checkIndex('podcast') as Pbj.Podcast[] || [];
    const needRefreshing = this.updatePodcastStatus(podcasts);
    if (!!needRefreshing.length) {
      this.pollForPodcastsStatus(timeout);
      this.indexDistributor('podcast').next(podcasts); // Redistribute with new state
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Refresh All Episodes (Podcast) ***">

  private updateEpisodesStatus(podcast): Pbj.Podcast[] {
    return podcast ? podcast.episodes.reduce((changed, episode) => {
      const needRefresh = episode.status !== 'completed' && episode.status !== 'refreshing';
      if (needRefresh) {
        changed.push(episode);
        episode.status = 'refreshing';
        this.proxy.retrieveEpisode(episode.item).catch(e => console.error(e));
      }
      return changed;
    }, []) : [];
  }

  private pollForEpisodesStatus(podcastId: string, podcast, timeout): void {
    this.poll(
      async () => {
        console.log('checking podcasts episodes again', podcastId);
        podcast = await this.getItem(podcastId, 'podcast', ['episode'], true); // force database update
        return podcast.episodes.reduce((allDone, episode) => allDone && (episode.status === 'completed' || episode.status === 'error'), true); // return doStop
      },
      () => {
        // reset refreshing state to new TODO: set state to aborted
        podcast = this.dataStore.checkIndexEntry(podcastId, 'podcast', ['episode']) as Pbj.Podcast;
        if (podcast) {
          podcast.episodes.forEach(episode => episode.status = episode.status === 'refreshing' ? 'new' : episode.status);
          this.itemDistributor('podcast').next(podcast); // Redistribute with new state
        }
      }, timeout
    );
  }

  refreshEpisodes(podcastId: string, timeout = 15000): void {
    // get podcast from local index
    const podcast = this.dataStore.checkIndexEntry(podcastId, 'podcast', ['episode']) as Pbj.Podcast;
    // check status of all episodes
    const refreshingEpisodes = this.updateEpisodesStatus(podcast);
    // if there are episodes the need refreshing start polling for complete status
    if (!!refreshingEpisodes.length) {
      console.log('start refresh and polling of episode');
      this.pollForEpisodesStatus(podcastId, podcast, timeout);
      this.itemDistributor('podcast').next(podcast); // Redistribute with new state
    }
  }

  // </editor-fold>

  // async addToPlaylist(id: string, trackIDs: string[]): Promise<void> {
  //   const playlist = await this.getItem(id, 'playlist', []);
  //   console.log(playlist);
  //   if (playlist) {
  //     // await this.proxy.addToPlaylist(id, playlist.trackIDs.concat(trackIDs));
  //     // console.log(playlist.trackIDs.concat(trackIDs));
  //   } else {
  //     console.warn('playlist not found ?????????????????????????????????');
  //   }
  // }

  async getAllTracksForItem(item: Pbj.Base): Promise<Pbj.Track[]> {
    if (!item) {
      return [];
    }
    switch (item.item_type) {
      case 'track':
        return [item as Pbj.Track];
      case 'album':
        let album = item as Pbj.Album;
        album = album.tracks ? album : await this.getItem(item.id, 'album', ['track'], true);
        return album.tracks;
      case 'artist':
        const allTracks: Pbj.Track[] = [];
        let artist = (item as Pbj.Artist);
        artist = artist.albums ? artist : await this.getItem(item.id, 'artist', ['album', 'track'], true);
        for (let artistAlbum of artist.albums) {
          if (!artistAlbum.tracks.length) {
            artistAlbum = await this.getItem(artistAlbum.id, 'album', ['track'], true);
          }
          console.log(artistAlbum.tracks.length);
          allTracks.push(...artistAlbum.tracks);
        }
        return allTracks;
      case 'folder':
        const tracks: Pbj.Track[] = [];
        let folder = (item as Pbj.Folder);
        folder = folder.tracks && folder.folders ? folder : await this.getItem(item.id, 'folder', ['folder', 'track'], true);
        // one level only for now => make recursive
        for (let subFolder of folder.folders) {
          if (!subFolder.tracks) {
            subFolder = await this.getItem(subFolder.id, 'folder', ['folder', 'track'], true);
          }
          console.log(subFolder);
          tracks.push(...subFolder.tracks);
        }
        folder.tracks ? tracks.push(...folder.tracks) : 0;
        return tracks;
      case 'playlist':
      case 'podcast':
      case 'episode':
      case 'root':
      default:
        console.warn('unsupported get all tracks for type', item.item_type);
        return [];
    }
  }

  async getAllSelectable(item: Pbj.Base): Promise<{ id: string; type: Pbj.ItemType }[]> {
    if (!item) {
      return [];
    }
    switch (item.item_type) {
      case 'track':
        return [{ id: item.id, type: item.item_type }];
      case 'album':
        return [{ id: item.id, type: item.item_type }, ...(item as Pbj.Album).trackIDs.map(id => ({
          id, type: 'track' as Pbj.ItemType
        }))];
      case 'artist':
        const all: { id: string; type: Pbj.ItemType }[] = [{ id: item.id, type: item.item_type }];
        let artist = (item as Pbj.Artist);
        artist = artist.albums ? artist : await this.getItem(item.id, 'artist', ['album'], true);
        for (const artistAlbum of artist.albums) {
          all.push({ id: artistAlbum.id, type: 'album' as Pbj.ItemType }, ...artistAlbum.trackIDs.map(id => ({
            id, type: 'track' as Pbj.ItemType
          })));
        }
        return all;
      case 'folder':
        const fall: { id: string; type: Pbj.ItemType }[] = [{ id: item.id, type: 'folder' }];
        let folder = (item as Pbj.Folder);
        folder = folder.tracks && folder.folders ? folder : await this.getItem(item.id, 'folder', ['folder', 'track'], true);
        // two levels only for now => make recursive
        for (let subFolder of folder.folders) {
          if (!subFolder.tracks) {
            subFolder = await this.getItem(subFolder.id, 'folder', ['folder', 'track'], true);
          }
          fall.push({ id: subFolder.id, type: 'folder' }, ...subFolder.tracks.map(track => {
            console.log('found track', track);
            return {
              id: track.id, type: 'track' as Pbj.ItemType
            };
          }));

          for (let subsubFolder of subFolder.folders) {
            if (!subsubFolder.tracks) {
              subsubFolder = await this.getItem(subsubFolder.id, 'folder', ['folder', 'track'], true);
            }
            fall.push({ id: subsubFolder.id, type: 'folder' }, ...subsubFolder.tracks.map(track => {
              console.log('found track', track);
              return {
                id: track.id, type: 'track' as Pbj.ItemType
              };
            }));
          }
        }
        if (folder.tracks) {
          fall.push(...folder.tracks.map(track => {
            console.log('found track', track);
            return {
              id: track.id, type: 'track' as Pbj.ItemType
            };
          }));
        }
        return fall;
      case 'playlist':
      case 'podcast':
      case 'episode':
      case 'root':
      default:
        console.warn('unsupported get all tracks for type', item.item_type);
        return [];
    }
  }

  download(item: Pbj.Base): void {
    this.startRequest();
    const url = this.proxy.getDownloadUrl(item.id);
    console.log(url, 'downloading TODO: not like this....');
    window.location.href = url;
    this.endRequest();
  }

  /**
   * TODO: this is bad because it loads all indexes wait till i know how to server search by regex and use this for offline only
   * @param value
   */
  async searchAll(value: string): Promise<Pbj.Base[]> {
    const regEx = RegExp(`.*${value}.*`, 'i');
    return [].concat(...await Promise.all([
      this.getIndex('artist', [], false),
      this.getIndex('album', [], false),
      this.getIndex('folder', [], false),
      this.getIndex('track', [], false)
    ]))
      .filter(item => regEx.test(Utils.getNameFromBase(item)))
      .sort((a: Pbj.Base, b: Pbj.Base) => a.item_type.localeCompare(b.item_type));
  }

  async getStats() {
    return this.proxy.getStats();
  }

  async getSubItemFromItem(item: Pbj.Base): Promise<Pbj.Base> {
    switch (item.item_type) {
      case 'root':
        console.warn('No Sub for Root');
        break;
      case 'folder':
        item = (item as Pbj.Folder).parentID
          ? (await this.getItem((item as Pbj.Folder).parentID, 'folder', ['folder'], true))
          : item;
        break;
      case 'artist':
        console.warn('No Sub for Artist');
        break;
      case 'album':
        item = (item as Pbj.Album).artistID
          ? (await this.getItem((item as Pbj.Album).artistID, 'artist', ['album', 'track'], true))
          : item;
        break;
      case 'track':
        item = (item as Pbj.Track).albumID
          ? (await this.getItem((item as Pbj.Track).albumID, 'album', [], true))
          : item;
        break;
      case 'playlist':
        break;
      case 'podcast':
        break;
      case 'episode':
        break;
    }
    return item;
  }

  getStreamUrl(id: string) {
    return this.proxy.getStreamUrl(id);
  }

  private async getItemsByIDs<T extends Pbj.Base[]>(ids: string[], type: Pbj.ItemType, includes?: Pbj.ItemIncludes[], force = CACHE_DISABLED): Promise<T> {
    const pbj_item = this.dataStore.checkIndexEntries(ids, type, includes, force) || await this.proxy.getIndexEntries(ids, type, includes);
    return pbj_item as T;
  }

  async getTracksByIDs(trackIDs: string[]): Promise<Pbj.Track[]> {
    return this.getItemsByIDs<Pbj.Track[]>(trackIDs, 'track', []);
  }
}
