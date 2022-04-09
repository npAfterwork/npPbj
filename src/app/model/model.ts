import {Jam, JamParameters} from '../jam';
import {EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';

// Define Omit.  Can be defined in a utilities package
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export declare namespace Pbj {
  // Is a subset of DBObjectType from server
  // 	root,user,folder,track,state,playlist,podcast,episode,bookmark,album,artist,playqueue,radio
  export type ItemType = 'root' | 'folder' | 'artist' | 'album' | 'track' | 'playlist' | 'podcast' | 'episode';
  export type ItemIncludes = ItemType | 'similar';
  export type ListType = JamParameters.ListType | 'newest';
  export type SubListType = 'artistAlbums' | 'artistTracks' | 'artistTopTracks' | 'albumTracks' | 'podcastEpisodes'
  | 'folderChildren' | 'folderTracks' | 'playlistTracks' | 'similarArtists';
  export type IndexType = ItemType; // needs to extend ItemType so lists can be connected to the index
  export type PodcastStatusType = Jam.PodcastStatusType | 'refreshing'; // added own state while waiting for state change
  export type EpisodeStatusType = Jam.PodcastEpisodeStatusType | 'refreshing'; // added own state while waiting for state change

  export interface Base extends Jam.Base {
    item_type: ItemType;
  }

  export interface Folder extends Jam.Folder, Base {
    item_type: 'folder';
    folders?: Folder[];
    tracks?: Track[];
  }

  export interface Artist extends Jam.Artist, Base {
    item_type: 'artist';
    albums?: Album[];
    tracks?: Track[];
    similar?: Artist[];
  }

  export interface Album extends Jam.Album, Base {
    item_type: 'album';
    tracks?: Track[];
  }

  export interface Track extends Jam.Track, Base {
    item_type: 'track';
  }

  export interface Playlist extends Jam.Playlist, Base {
    item_type: 'playlist';
    tracks?: Track[];
  }

  export interface Episode extends Omit<Jam.PodcastEpisode, 'status'>, Base {
    item_type: 'episode';
    status: EpisodeStatusType;
  }

  export interface Podcast extends Omit<Jam.Podcast, 'status' | 'episodes'>, Base {
    item_type: 'podcast';
    episodes?: Episode[];
    status: PodcastStatusType;
  }

  export interface Root extends Jam.Root, Base {
    item_type: 'root';
  }

  // tslint:disable-next-line:interface-over-type-literal
  export type ItemMap<T extends Pbj.Base> = { [id: string]: T };
  export type ItemDistributor = { [key in Pbj.ItemType]: BehaviorSubject<Pbj.Base> };
  export type IndexDistributor = { [key in Pbj.IndexType]: Subject<Pbj.Base[]> };
  export type SubListDistributor = { [key in Pbj.SubListType]: BehaviorSubject<Pbj.Base[]> };
  export type ListMap = { [list in Pbj.ListType]?: Pbj.TypeMap };
  export type ListDistributor = { [key in Pbj.ListType]: BehaviorSubject<Pbj.Base[]> };
  export type TypeMap = { [type in Pbj.ItemType]?: Pbj.Base[] };

  // -----------------------------------------------------------------------

  export interface Progress {
    type: 'start' | 'report' | 'end';
    textID: string;
    count: number;
  }

  export interface ServerSettings {
    autoSignIn: boolean;
    storePassword: boolean;
  }

  export interface ListSettings {
    size: ListItemSize;
    panel: boolean;
  }

  export interface LibrarySettings {
    types: { [key in Pbj.ItemType]: boolean };
    lists: { [key in Pbj.ListType]: boolean };
    views: { [key in Pbj.ItemType]?: ListSettings };
  }

  export interface SingleSettings {
    artist: {
      albums: Pbj.ListSettings;
    };
    album: Pbj.ListSettings;
    folder: Pbj.ListSettings;
  }

  export interface DashboardSettings {
    boxes: Pbj.DashboardBox[];
  }

  export interface AppSettings {
    lastTipsOfTheDay: number[];
    helpIDs: number[];
  }

  export interface ConfigSettings {
    rndSongCount: number;
  }

  export interface QueueSettings {
    list: Pbj.ListSettings;
  }

  export interface PlayerSettings {
    prev: boolean;
    mode: boolean;
    repeat: boolean;
  }

  export interface UiSettings {
    coverAlign: 'top' | 'center';
    coverSize: 'small' | 'medium' | 'large';
    coverFit: 'cover' | 'contain';
    helpMode: 'always' | 'once' | 'never';

    useListSettingsPopoverAlways: boolean;
  }

  export interface Settings {
    server: Pbj.ServerSettings;
    intern: Pbj.AppSettings;
    ui: Pbj.UiSettings;
    library: Pbj.LibrarySettings;
    single: Pbj.SingleSettings;
    home: Pbj.DashboardSettings;
    config: Pbj.ConfigSettings;
    player: Pbj.PlayerSettings;
    queue: Pbj.QueueSettings;
  }

  export interface Choice {
    text: string;
    value: any;
    icon?: Pbj.Icon;
  }

  export interface Filter {
    letter?: string;
    text?: string;
    rootFolderIds?: string[];
    items?: Pbj.Base[];
    currentLetters?: string;
  }

  export type Color = 'primary' | 'secondary';
  export type Icon =
    'add-sharp'
    | 'add-circle-sharp'
    | 'albums-sharp'
    | 'apps-sharp'
    | 'barcode-sharp'
    | 'close-sharp'
    | 'close-circle-sharp'
    | 'download-sharp'
    | 'eye-sharp'
    | 'funnel-sharp'
    | 'heart-sharp'
    | 'heart-dislike-sharp'
    | 'heart-empty-sharp'
    | 'heart-half-sharp'
    | 'help-sharp'
    | 'home-sharp'
    | 'pricetags-sharp'
    | 'library-sharp'
    | 'images-sharp'
    | 'keypad-sharp'
    | 'list-sharp'
    | 'ellipsis-horizontal-sharp'
    | 'ellipsis-vertical-sharp'
    | 'pause-sharp'
    | 'play-sharp'
    | 'play-circle-sharp'
    | 'refresh-sharp'
    | 'remove-sharp'
    | 'resize-sharp'
    | 'search-sharp'
    | 'shuffle-sharp'
    | 'toggle-sharp'
    | 'settings-sharp'
    | 'trash-sharp'
    | 'volume-low-sharp'
    | 'volume-mute-sharp'
    | 'volume-off-sharp'
    | 'volume-high-sharp' ;

  export interface MenuItem {
    route: string[] | string;
    label: string;
    icon: Pbj.Icon;
    disabled?: () => boolean;
  }

  export type ListItemImageMode = 'item' | 'cover' | 'selection' | 'no-images';

  export interface ViewButton {
    title?: string;
    icon?: {
      name: Pbj.Icon;
      size?: 'small' | 'large' | 'default';
      slot?: 'start' | 'icon-only';
    };
    fill?: 'solid' | 'outline' | 'clear';
    color?: 'primary' | 'secondary';

    onClick($event?: MouseEvent, item?: Pbj.Base): void;
  }

  export interface PopoverAction extends ViewButton {
    close: boolean;
  }

  export type ToolbeltButton =
    'toggle_mode'
    | 'toggle_size'
    | 'toggle_popover'
    | 'azpopover'
    | 'add'
    | 'root';

  export type ToolbarButton =
    'back'
    | 'help'
    | 'search'
    | 'refresh'
    | 'add'
    | 'clear_filter'
    | 'more';

  export interface ToolbarUIButton extends ViewButton {
    id: Pbj.ToolbarButton;
  }

  export interface ToolbeltUIButton extends ViewButton {
    id: Pbj.ToolbeltButton;
  }

  export type ListItemSize = 'small' | 'medium' | 'large';

  export type ItemEventEmitter = EventEmitter<{ ev: MouseEvent; item: Pbj.Base }>;

  export type LifecycleHook =
    'startNav' | 'endNav'
    | 'ionViewWillEnter' | 'ionViewDidEnter'
    | 'ionViewWillLeave' | 'ionViewDidLeave';

  export interface DashboardBox {
    boxtype: DashboardBoxType;
    size?: ListItemSize;
    rows?: number;
    amount?: number;
    listtype?: ListType;
    itemtype?: ItemType;
    needsUpdate?: boolean; // UI-Helper
  }

  export type PopoverType = 'az' | 'dash' | 'help' | 'root' | 'menu' | 'image' | 'listconfig';
  export type ModalType = 'not-yet-needed';
  export type DashboardBoxType = 'list' | 'stats' | 'panel';

  export interface ItemInfo {
    name: string;
    subline: string;
    infoline: string;
    endline: string;
    typeinfo: string;
  }

}

export interface OnIonViewWillEnter {
  ionViewWillEnter(): void;
}

export interface OnIonViewDidEnter {
  ionViewDidEnter(): void;
}

export interface OnIonViewWillLeave {
  ionViewWillLeave(): void;
}

export interface OnIonViewDidLeave {
  ionViewDidLeave(): void;
}

export interface OnIonViewWillUnload {
  ionViewDidLeave(): void;
}

export type TlaType = 'ball-atom'
| 'ball-beat'
| 'ball-circus'
| 'ball-climbing-dot'
| 'ball-clip-rotate'
| 'ball-clip-rotate-multiple'
| 'ball-clip-rotate-pulse'
| 'ball-elastic-dots'
| 'ball-fall'
| 'ball-fussion'
| 'ball-grid-beat'
| 'ball-grid-pulse'
| 'ball-newton-cradle'
| 'ball-pulse'
| 'ball-pulse-rise'
| 'ball-pulse-sync'
| 'ball-rotate'
| 'ball-running-dots'
| 'ball-scale'
| 'ball-scale-multiple'
| 'ball-scale-pulse'
| 'ball-scale-ripple'
| 'ball-scale-ripple-multiple'
| 'ball-spin'
| 'ball-spin-clockwise'
| 'ball-spin-clockwise-fade'
| 'ball-spin-clockwise-fade-rotating'
| 'ball-spin-fade'
| 'ball-spin-fade-rotating'
| 'ball-spin-rotate'
| 'ball-square-clockwise-spin'
| 'ball-square-spin'
| 'ball-triangle-path'
| 'ball-zig-zag'
| 'ball-zig-zag-deflect'
| 'cog'
| 'cube-transition'
| 'fire'
| 'line-scale'
| 'line-scale-party'
| 'line-scale-pulse-out'
| 'line-scale-pulse-out-rapid'
| 'line-spin-clockwise-fade'
| 'line-spin-clockwise-fade-rotating'
| 'line-spin-fade'
| 'line-spin-fade-rotating'
| 'pacman'
| 'square-jelly-box'
| 'square-loader'
| 'square-spin'
| 'timer'
| 'triangle-skew-spin';

export const ClaTypes: TlaType[] = [
  'ball-atom', 'ball-beat', 'ball-circus', 'ball-climbing-dot', 'ball-clip-rotate',
  'ball-clip-rotate-multiple', 'ball-clip-rotate-pulse', 'ball-elastic-dots', 'ball-fall', 'ball-fussion', 'ball-grid-beat',
  'ball-grid-pulse', 'ball-newton-cradle', 'ball-pulse', 'ball-pulse-rise', 'ball-pulse-sync', 'ball-rotate', 'ball-running-dots',
  'ball-scale', 'ball-scale-multiple', 'ball-scale-pulse', 'ball-scale-ripple', 'ball-scale-ripple-multiple', 'ball-spin',
  'ball-spin-clockwise', 'ball-spin-clockwise-fade', 'ball-spin-clockwise-fade-rotating', 'ball-spin-fade', 'ball-spin-fade-rotating',
  'ball-spin-rotate', 'ball-square-clockwise-spin', 'ball-square-spin', 'ball-triangle-path', 'ball-zig-zag', 'ball-zig-zag-deflect',
  'cog', 'cube-transition', 'fire', 'line-scale', 'line-scale-party', 'line-scale-pulse-out', 'line-scale-pulse-out-rapid',
  'line-spin-clockwise-fade', 'line-spin-clockwise-fade-rotating', 'line-spin-fade', 'line-spin-fade-rotating', 'pacman',
  'square-jelly-box', 'square-loader', 'square-spin', 'timer', 'triangle-skew-spin'
];

export type TlaSpinnerData = {
  type: TlaType;
  size: 'small' | 'default' | 'medium' | 'large';
  color: string;
  bdColor: string;
};
