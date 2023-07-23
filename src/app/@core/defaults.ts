import {Pbj} from './model';

// BEWARE: Keep Structure deepth to max 2
export const CDEFAULT_SETTINGS: Pbj.Settings = {
  intern: {
    lastTipsOfTheDay: [],
    helpIDs: []
  },
  server: {
    autoSignIn: true,
    storePassword: true
  },
  ui: {
    coverAlign: 'center',
    coverSize: 'medium',
    coverFit: 'contain',
    helpMode: 'once',
    useListSettingsPopoverAlways: true
  },
  player: {
    prev: false,
    mode: false,
    repeat: false
  },
  queue: {
    list: {panel: false, size: 'small'}
  },
  config: {
    rndSongCount: 50
  },
  single: {
    album: {panel: false, size: 'small'}, // tracks
    artist: {
      albums: {panel: true, size: 'medium'}
    },
    folder: {panel: true, size: 'medium'} // subfolder
  },
};
export const CDEFAULT_USER: any = {
  server: 'http://localhost:4040',
  name: 'admin',
  password: 'admin'
};
