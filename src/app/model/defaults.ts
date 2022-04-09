import {Pbj} from './model';

// BEWARE: Keep Structure deepth to max 2
export const CDEFAULT_SETTINGS: Pbj.Settings = {
  intern:  {
    lastTipsOfTheDay: [],
    helpIDs:          []
  },
  server:  {
    autoSignIn:    true,
    storePassword: true
  },
  ui:      {
    coverAlign:                   'center',
    coverSize:                    'medium',
    coverFit:                     'contain',
    helpMode:                     'once',
    useListSettingsPopoverAlways: true
  },
  player:  {
    prev:   false,
    mode:   false,
    repeat: false
  },
  queue:   {
    list: { panel: false, size: 'small' }
  },
  config:  {
    rndSongCount: 50
  },
  library: {
    types: {
      artist:   true,
      album:    true,
      track:    true,
      folder:   true,
      episode:  false,
      playlist: false,
      podcast:  false,
      root:     false
    },
    lists: {
      newest:     true,
      recent:     true,
      frequent:   true,
      random:     true,
      avghighest: false,
      faved:      false,
      highest:    false
    },
    views: {
      artist: { panel: true, size: 'large' },
      album:  { panel: true, size: 'medium' },
      track:  { panel: false, size: 'small' },
      folder: { panel: true, size: 'medium' }
    }
  },
  single:  {
    album:  { panel: false, size: 'small' }, // tracks
    artist: {
      albums: { panel: true, size: 'medium' }
    },
    folder: { panel: true, size: 'medium' } // subfolder
  },
  home:    {
    boxes: [
      { size: 'large', boxtype: 'stats' },
      { itemtype: 'album', listtype: 'newest', rows: 1, size: 'medium', amount: 10, boxtype: 'panel' },
      { itemtype: 'album', listtype: 'recent', rows: 1, size: 'small', amount: 10, boxtype: 'list' },
      { itemtype: 'track', listtype: 'recent', rows: 2, size: 'small', amount: 10, boxtype: 'list' },
      { itemtype: 'album', listtype: 'random', rows: 1, size: 'large', amount: 20, boxtype: 'panel' },
      { itemtype: 'artist', listtype: 'random', rows: 1, size: 'large', amount: 20, boxtype: 'panel' }
    ]
  }
};
export const CDEFAULT_USER: any = {
  server:   'http://localhost:4040',
  name:     'admin',
  password: 'admin'
};
