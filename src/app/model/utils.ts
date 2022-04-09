import {Pbj} from './model';

const infoCache: { [key: string]: Pbj.ItemInfo } = {};

export class Utils {

  static groupBy<T>(items: T[], count: number, fillWithNull = false): T[][] {
    const result = [];
    let current = [];
    items.forEach((item, idx) => {
      current.push(item);
      if ((idx + 1) % count === 0) {
        result.push(current);
        current = [];
      }
    });

    if (current.length > 0) {
      while (fillWithNull && items && current.length < count) {
        current.push(null);
      }
      result.push(current);
    }
    return result;

  }

  static duration(value: number, hours = false): any {
    if (value) {
      const sec_num = value;
      const _hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (_hours * 3600)) / 60);
      const seconds = Math.floor(sec_num - (_hours * 3600) - (minutes * 60));
      const hoursStr = _hours > 0 ? `${(_hours < 10) ? `0${_hours}` : _hours}:` : '';
      minutes += +(!hours ? _hours * 60 : 0);
      return `${hours ? hoursStr : ''}${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`;
    }
    return `${hours ? '00:' : ''}00:00`;
  }

  static getImageIdFromBase(item: Pbj.Base) {
    if (!item) {
      return 'no item';
    }
    switch (item.item_type) {
      case 'track':
        console.log('getting album instead of track image');
        const track = item as Pbj.Track;
        return track.albumID ? track.albumID : track.id;
      case 'album':
      case 'artist':
      case 'playlist':
      case 'podcast':
      case 'episode':
      case 'root':
      case 'folder':
      default:
        return item.id;
    }
  }

  static getNameFromBase(item: Pbj.Base, mode?: Pbj.ListItemImageMode) {
    if (!item) {
      return 'no item';
    }
    const prefix = mode === 'selection' ? `[${item.item_type.toUpperCase()}] ` : '';
    switch (item.item_type) {
      case 'track':
        const track = item as Pbj.Track;
        return prefix + (track.tag ? track.tag.title : track.name);
      case 'album':
      case 'artist':
      case 'playlist':
      case 'podcast':
      case 'episode':
      case 'root':
      case 'folder':
      default:
        return prefix + item.name;
    }
  }

  private static getItemInfoForArtist(artist: Pbj.Artist, mode?: Pbj.ListItemImageMode): Pbj.ItemInfo {
    return {
      name:     Utils.getNameFromBase(artist, mode),
      subline:  undefined,
      infoline: `Albums ${artist.albumCount} • Songs ${artist.trackCount}`,
      endline:  undefined,
      typeinfo: artist.genres ? ` • ${artist.genres.join('/')}` : ''
    };
  }

  private static getItemInfoForTrack(track: Pbj.Track, mode?: Pbj.ListItemImageMode): Pbj.ItemInfo {
    return {
      name:     Utils.getNameFromBase(track, mode),
      subline:  undefined,
      infoline: undefined,
      endline:  undefined,
      typeinfo: Utils.duration(track.duration)
    };
  }

  private static getItemInfoForFolder(folder: Pbj.Folder, mode?: Pbj.ListItemImageMode): Pbj.ItemInfo {
    return {
      name:     Utils.getNameFromBase(folder, mode),
      subline:  undefined, // TODO: mb folder.parentID ...
      infoline: `${folder.folderCount} Folder • ${folder.trackCount} Songs`,
      endline:  undefined,
      typeinfo: ` • Lvl ${folder.level}`
    };
  }

  private static getItemInfoForAlbum(album: Pbj.Album, mode?: Pbj.ListItemImageMode): Pbj.ItemInfo {
    return {
      name:     Utils.getNameFromBase(album, mode),
      subline:  album.artist,
      infoline: album.year ? `${album.year}` : '',
      endline:  ` • ${album.trackCount} Songs • ${Utils.duration(album.duration)} min`,
      typeinfo: album.genres ? ` • ${album.genres.join('/')}` : ''
    };
  }

  /**
   * This gets called a million times...
   * Cache or handle different i guess ... or ignore... hmm
   * @param item
   * @param mode
   */
  static getItemInfoFromBase(item: Pbj.Base, mode?: Pbj.ListItemImageMode): Pbj.ItemInfo {
    if (!item) { return { endline: '', infoline: '', name: '', subline: '', typeinfo: '' }; }
    let result = infoCache[item.id];
    if (result) { return result; }
    switch (item.item_type) {
      case 'artist':
        result = Utils.getItemInfoForArtist(item as Pbj.Artist, mode);
        break;
      case 'album':
        result = Utils.getItemInfoForAlbum(item as Pbj.Album, mode);
        break;
      case 'track':
        result = Utils.getItemInfoForTrack(item as Pbj.Track, mode);
        break;
      case 'folder':
        result = Utils.getItemInfoForFolder(item as Pbj.Folder, mode);
        break;
      case 'playlist':
      case 'podcast':
      case 'episode':
      case 'root':
      default:
        return undefined;
    }
    infoCache[item.id] = result;
    return result;
  }

  static headerFnIndex(record: any, recordIndex: number, records: any[]) {
    if (Array.isArray(record)) {
      if (recordIndex === 0) { return record.reduce((prev, current: Pbj.Base) => prev + current.name[0], ''); }
      if ((recordIndex > 0) && (records[recordIndex - 1])
        && ((records[recordIndex - 1].reduce((prev, current: Pbj.Base) => prev + current.name[0], '').toLowerCase())
          !== record.reduce((prev, current: Pbj.Base) => prev + current.name[0], '').toLowerCase())) {
        return record.reduce((prev, current: Pbj.Base) => prev + current.name[0], '').toUpperCase();
      }
    } else {
      if (recordIndex === 0) { return record.name[0].toUpperCase(); }
      if ((recordIndex > 0) && (records[recordIndex - 1]) && ((records[recordIndex - 1].name[0].toLowerCase()) !== record.name[0].toLowerCase())) {
        return record.name[0].toUpperCase();
      }
    }
    return null;
  }

  static headerFnAlbumYears(record: Pbj.Album, recordIndex: number, records: any[]) {
    if (Array.isArray(record)) { // Panel item -> skip
      return null;
    }
    if (recordIndex === 0) { return record.year ? `[${record.year}]` : ''; }
    if ((recordIndex > 0) && (records[recordIndex - 1]) && ((records[recordIndex - 1].year) !== record.year)) {
      return `[${record.year}]`;
    }
    return null;
  }

  static headerFnItemType(record: any, recordIndex: number, records: any[]) {
    if (Array.isArray(record)) {
      return null; // TODO: fix header item type when i know what to do here :)
    }
    if (recordIndex === 0) { return record.item_type.toUpperCase(); }
    if ((recordIndex > 0) && (records[recordIndex - 1]) && ((records[recordIndex - 1].item_type) !== record.item_type)) {
      return record.item_type.toUpperCase();
    }
    return null;
  }

  static unGroupBy(items: Pbj.Base[][]): Pbj.Base[] {
    return [].concat(...items);
  }

  static getTopRated(items: Pbj.Base[], amount: number) {
    return items.sort((a, b) => a.state.rated - b.state.rated).splice(0, amount);
  }

  static toggleListItemSize(current: Pbj.ListItemSize): Pbj.ListItemSize {
    return (current === 'large') ? 'small' : (current === 'small' ? 'medium' : 'large');
  }

  static count(value: number) {
    return value > 999 ? `${Math.trunc(value / 1000)}k` : value;
  }
}
