import {Pbj} from './model';

export const CROUTES = {
  ROOT:            '/',
  FOLDER:          { ROUTE: 'folder/:id', GET: (id: string) => ['folder', id] },
  FOLDERS:         'index/single/folder',
  ARTIST:          { ROUTE: 'artist/:id', GET: (id: string) => ['artist', id] },
  ARTISTS:         'index/single/artist',
  ALBUM:           { ROUTE: 'album/:id', GET: (id: string) => ['album', id] },
  ALBUMS:          'index/single/album',
  PLAYLIST:        { ROUTE: 'playlists/:id', GET: (id: string) => ['playlists', id] },
  PLAYLISTS:       'index/single/playlist',
  PODCAST:         { ROUTE: 'podcast/:id', GET: (id: string) => ['podcast', id] },
  PODCASTS:        'index/single/podcast',
  HOME:            'home',
  PODCAST_EPISODE: { ROUTE: 'podcast/:cid/:eid', GET: (podcast_id: string, episode_id: string) => ['podcast', podcast_id, episode_id] },
  LIST:            {
    ROUTE: 'list/:style/:type/:list',
    GET:   (style: 'all' | 'list' | 'type' | 'none', type: Pbj.ItemType, list: Pbj.ListType) => ['list', style, type, list]
  },
  INDEX:           { ROUTE: 'index/:style/:type', GET: (style: 'all' | 'single', type: Pbj.ItemType) => ['index', style, type] },
  START:           'start',
  QUEUE:           'queue',
  SEARCH:          'search',
  SETTINGS:        'settings'
};
