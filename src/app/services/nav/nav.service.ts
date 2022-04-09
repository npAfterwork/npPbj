import {UnsupportedItemType} from '../../model/errors';
import {Pbj} from '../../model/model';
import {CROUTES} from '../../model/routes';
import {DataService} from '../data/data.service';
import {Location} from '@angular/common';
import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivationStart, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs/index';
import {filter} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private store = {
    backOptions: {
      route:    null,
      animated: true
    }
  };

  private readonly subscriber: { [key in Pbj.LifecycleHook]: { [url: string]: Subscription[] } } = {
    startNav:         {},
    endNav:           {},
    ionViewWillEnter: {},
    ionViewDidEnter:  {},
    ionViewWillLeave: {},
    ionViewDidLeave:  {}
  };

  readonly emitter: { [key in Pbj.LifecycleHook]: EventEmitter<string> } = {
    startNav:         new EventEmitter<string>(),
    endNav:           new EventEmitter<string>(),
    ionViewWillEnter: new EventEmitter<string>(),
    ionViewDidEnter:  new EventEmitter<string>(),
    ionViewWillLeave: new EventEmitter<string>(),
    ionViewDidLeave:  new EventEmitter<string>()
  };

  url: string;

  constructor(
    public readonly router: Router,
    private readonly translate: TranslateService,
    private readonly navCtrl: NavController,
    private readonly location: Location,
    private readonly dataService: DataService
  ) {
    console.debug('NavService CREATE');
    this.router.events.pipe(
      filter(ev => (ev instanceof NavigationEnd) || (ev instanceof NavigationStart) || (ev instanceof ActivationStart))
    ).subscribe(ev => {
      if (ev instanceof ActivationStart) {
        const snapshot = (ev).snapshot;
        this.url = `/${snapshot
          .pathFromRoot
          .map((route: ActivatedRouteSnapshot) => route.url.join('/'))
          .filter(fragment => !!fragment && fragment.length)
          .join('/')}`;
        console.debug('Navigation Event Activation', this.url);
      } else if (ev instanceof NavigationStart) {
        this.url = (ev).url;
        console.debug('Navigation Event Start', this.url);
        this.emitter.startNav.next(this.url);
      } else {
        // console.log(ev);
        console.debug('Navigation Event End', (ev as NavigationEnd).url);
        this.emitter.endNav.next((ev as NavigationEnd).url);
      }
    });
  }

  // <editor-fold desc="*** Navigation ***">

  unregister(type: Pbj.LifecycleHook, id: string, url: string) {
    if (!url || !url.length) {url = '_all'; }
    const subscriber = !!this.subscriber[type][url] && this.subscriber[type][url][id];
    if (subscriber) {
      console.debug('unregister', id, type, url);
      subscriber.unsubscribe();
      delete this.subscriber[type][url][id];
    }
  }

  /**
   * Should work like this:
   * Component registers in ngOninit for IonWillEnter, IonWillLeave.. for the current url (from activation event, this.url)
   * Component unregisters in ngDestroy
   * When Ionic navigates to a child page the subscribers for IonWilEnter.., are called (page is not destroyed)
   * To prevent action for components not on the current page we use the current url as filter
   * So Components can have IonEnter and IonLeave Events which can be used instead of ngInit and ngDestroy
   */
  register(type: Pbj.LifecycleHook, id: string, url: string, callback: () => void, always: boolean) {
    if (!url || !url.length) {url = '_all'; }
    this.unregister(type, id, url);
    console.debug('register', id, url, type);
    const urlSubs = this.subscriber[type][url] || (this.subscriber[type][url] = []);
    urlSubs[id] = this.emitter[type].subscribe(currentUrl => {
      console.debug('Check', id, url, currentUrl, type);
      if (always || (currentUrl === url)) {
        console.debug('Activated', id, url, currentUrl, type);
        callback();
      }
    });
    // if (always || (this.router.url === url)) {
    //   console.debug('Activated on register', type, url);
    //   callback();
    // }
  }

  updateBack(animated: boolean, route: string[]) {
    this.store.backOptions.route = route;
    this.store.backOptions.animated = animated;
  }

  navigateBack() {
    if (this.store.backOptions.route) {
      this.navCtrl.navigateRoot(this.store.backOptions.route, { animated: true, animationDirection: 'back' }).catch(e => console.error(e));
    } else {
      this.navCtrl.back({ animated: true, animationDirection: 'back' });
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Routing ***">

  private async navigateToFolder(folder: Pbj.Root | Pbj.Folder | Pbj.Base | string, root = false) {
    console.debug(folder, 'nav to folder');
    const id = (typeof folder === 'string') ? folder : folder.id;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.FOLDER.GET(id), { animated: true, animationDirection: 'forward' })
      : this.navCtrl.navigateForward(CROUTES.FOLDER.GET(id), { animated: true, animationDirection: 'forward' });
  }

  private async navigateToArtist(artist: Pbj.Artist | Pbj.Base | string, root = false) {
    const id = (typeof artist === 'string') ? artist : artist.id;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.ARTIST.GET(id), { animated: true, animationDirection: 'forward' })
      : this.navCtrl.navigateForward(CROUTES.ARTIST.GET(id), { animated: true, animationDirection: 'forward' });
  }

  private async navigateToAlbum(album: Pbj.Album | Pbj.Base | string, root = false) {
    const id = (typeof album === 'string') ? album : album.id;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.ALBUM.GET(id), { animated: true, animationDirection: 'forward' })
      : this.navCtrl.navigateForward(CROUTES.ALBUM.GET(id), { animated: true, animationDirection: 'forward' });
  }

  private async navigateToPlaylist(playlist: Pbj.Playlist | Pbj.Base | string, root = false) {
    const id = (typeof playlist === 'string') ? playlist : playlist.id;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.PLAYLIST.GET(id), { animated: true, animationDirection: 'forward' })
      : this.navCtrl.navigateForward(CROUTES.PLAYLIST.GET(id), { animated: true, animationDirection: 'forward' });
  }

  private async navigateToPodcast(podcast: Pbj.Podcast | Pbj.Base | string, root = false) {
    const id = (typeof podcast === 'string') ? podcast : podcast.id;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.PODCAST.GET(id), { animated: true, animationDirection: 'forward' })
      : this.navCtrl.navigateForward(CROUTES.PODCAST.GET(id), { animated: true, animationDirection: 'forward' });
  }

  private async navigateToEpisode(item: Pbj.Episode | Pbj.Base, root = false) {
    const episode = item as Pbj.Episode;
    return root
      ? this.navCtrl.navigateRoot(CROUTES.PODCAST_EPISODE.GET(episode.podcastID, episode.id), {
        animated: true, animationDirection: 'forward'
      })
      : this.navCtrl.navigateForward(CROUTES.PODCAST_EPISODE.GET(episode.podcastID, episode.id), {
        animated: true, animationDirection: 'forward'
      });
  }

  async navigateToItem(item: Pbj.Base, sub = false) {
    if (sub) { item = await this.dataService.getSubItemFromItem(item); }
    switch (item.item_type) {
      case 'root':
        return console.error('navigate to root is not supported!!!');
      case 'folder':
        return this.navigateToFolder(item, sub);
      case 'artist':
        return this.navigateToArtist(item, sub);
      case 'album':
        return this.navigateToAlbum(item, sub);
      case 'track':
        return console.warn('navigate to track');
      case 'playlist':
        return this.navigateToPlaylist(item, sub);
      case 'podcast':
        return this.navigateToPodcast(item, sub);
      case 'episode':
        return this.navigateToEpisode(item, sub);
      default:
        throw new UnsupportedItemType(item.item_type);
    }
    // const id = (typeof artist === 'string') ? artist : artist.id;
    // this.navCtrl.navigateForward(CROUTES.ARTIST.GET(id), {animated: true});
  }

  /**
   * Menu Items should start a new root navigation.
   * So going back should not be possible on a menu page.
   */
  async navigateToMenuItem(menuItem: Pbj.MenuItem) {
    return this.navCtrl.navigateRoot(menuItem.route, { animated: true, animationDirection: 'forward' });
  }

  async navigateToStart() {
    return this.navCtrl.navigateRoot(CROUTES.START, { animated: true, animationDirection: 'forward' });
  }

  async navigateToQueue() {
    return this.navCtrl.navigateForward(CROUTES.QUEUE, { animated: true, animationDirection: 'forward' });
  }

  async navigateToHome() {
    return this.navCtrl.navigateRoot(CROUTES.HOME, { animated: true, animationDirection: 'forward' });
  }

  async navigateToList(listtype: Pbj.ListType, itemtype: Pbj.ItemType) {
    return this.navCtrl.navigateForward(CROUTES.LIST.GET('list', itemtype, listtype), { animated: true, animationDirection: 'forward' });
  }

  // </editor-fold>

  /**
   * Only changes the url. Bypassing the router but updating the history for back navigation
   * Used to change the nav params of the index page
   */
  relocateToIndex(itemType: Pbj.ItemType, style: 'all' | 'single') {
    this.location.go(CROUTES.INDEX.GET(style, itemType).join('/'));
  }

  /**
   * Only changes the url. Bypassing the router but updating the history for back navigation
   * Used to change the nav params of the list page
   */
  relocateToList(type: Pbj.ItemType, list: Pbj.ListType, style: 'all' | 'list' | 'type' | 'none') {
    this.location.go(CROUTES.LIST.GET(style, type, list).join('/'));
  }

}
