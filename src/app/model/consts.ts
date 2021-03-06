import {Pbj} from './model';

export const CUNITS = {
  DAY: 'd'
};
export const CLOCALES = {
  DEFAULT: 'de',
  DE:      'de',
  EN:      'en'
};

export const CPBJ: {
  CLIENT: string; // Client Name send to the server
  TOOLBAR: {
    SMALL: number; // threshold for the verysmall view
  };
  CDASHBOX: {
    ITEMS: Pbj.ItemType[];
    LISTS: Pbj.ListType[];
    SIZES: Pbj.ListItemSize[];
    TYPES: Pbj.DashboardBoxType[];
    DEFAULT: Pbj.DashboardBox;
  };
} = {
  CLIENT:   'PB&J', // client name
  TOOLBAR:  {
    SMALL: 375
  },
  CDASHBOX: {
    ITEMS:   ['artist', 'album', 'track', 'folder'],
    LISTS:   ['random', 'newest', 'frequent', 'recent'],
    SIZES:   ['small', 'medium', 'large'],
    TYPES:   ['list', 'panel', 'stats'],
    DEFAULT: { listtype: 'random', itemtype: 'album', amount: 10, rows: 1, size: 'small', boxtype: 'panel' }
  }
};

export const CJAM_PODCASTS: ({ text: string; value: any; icon?: Pbj.Icon })[] = [
  { text: 'St. Pauli Spieltag', value: 'http://www.fcstpauli-afm.de/radio/spieltag.php', icon: 'heart-sharp' },
  { text: 'St. Pauli Erlesenes', value: 'http://www.fcstpauli-afm.de/radio/erlesenes.php', icon: 'heart-sharp' },
  { text: 'St. Pauli Politisch', value: 'http://www.fcstpauli-afm.de/radio/politisch.php', icon: 'heart-sharp' },
  { text: 'Ein Tag mit St. Pauli', value: 'http://www.fcstpauli-afm.de/radio/ein_tag_mit.php', icon: 'heart-sharp' },
  { text: 'Aufwachen', value: 'https://feed.aufwachen-podcast.de:443/mp3', icon: 'heart-sharp' },
  { text: 'Chaos Radio', value: 'http://chaosradio.ccc.de:80/chaosradio-latest.rss', icon: 'heart-sharp' },
  { text: 'Übersteiger', value: 'http://blog.uebersteiger.de/feed/mp3/', icon: 'heart-sharp' },
  { text: 'Lage der Nation', value: 'https://www.kuechenstud.io:443/lagedernation/feed/mp3/', icon: 'heart-sharp' }
];

// <editor-fold desc="*** Text IDS ***">

type TTextID = string;

export interface HelpEntry {
  id: number;
  title: TTextID;
  msg: TTextID;
}

const CPBJIndexTexts: { [key in Pbj.ItemType]: string } = {
  folder:   'Folder Index',
  album:    'Album Index',
  artist:   'Artist Index',
  track:    'Track Index',
  root:     'Root Folder Index',
  podcast:  'Podcasts',
  playlist: 'Playlists',
  episode:  'Episodes'
};

export const CPBJTexts = {
  HELP:  {
    PODCASTS: {
      NEW_CHANNEL:     {
        id:    1,
        title: 'PODCAST.NEW.HELP.title',
        msg:   'PODCAST.NEW.HELP.msg'
      },
      ALL_CHANNELS:    {
        id:    2,
        title: 'HELP.PODCASTS.ALL.title',
        msg:   'HELP.PODCASTS.ALL.msg'
      },
      NEWEST_EPISODES: {
        id:    3,
        title: 'HELP.PODCASTS.NEWEST.title',
        msg:   'HELP.PODCASTS.NEWEST.msg'
      }
    }
  },
  PAGES: {
    album:     'Album',
    albums:    'Albums',
    artist:    'Artist',
    artists:   'Artists',
    folder:    'Folder',
    folders:   'Folders',
    HOME:      {
      frequent: 'Frequent',
      new:      'Newest',
      recent:   'Recent',
      random:   'Random',
      home:     'Home'
    },
    playlist:  'Playlist',
    podcast:   'Podcast',
    podcasts:  'Podcasts',
    episode:   'Episode',
    episodes:  'Newest',
    starred:   'Starred',
    search:    'Search',
    playlists: 'Playlists',
    list:      'List',
    index:     CPBJIndexTexts
  }
};
// </editor-fold>
