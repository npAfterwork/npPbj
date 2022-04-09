import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {DataService} from '../data/data.service';
import {MessageService} from '../ui/message.service';
import {PlayerEvents, SoundManager} from './player.interface';
import {PlayerSoundmanager2} from './soundmanager/player.soundmanager2';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Injectable, NgZone} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _items: BehaviorSubject<Pbj.Track[]> = new BehaviorSubject<Pbj.Track[]>([]);
  set items(items: Pbj.Track[]) { this._items.next(items); }

  get items(): Pbj.Track[] { return this._items.getValue(); }

  private _current: BehaviorSubject<Pbj.Track> = new BehaviorSubject<Pbj.Track>(undefined);
  set current(item: Pbj.Track) { this._current.next(item); }

  get current(): Pbj.Track { return this._current.getValue(); }

  duration: number;
  position: number;
  isPlaying = false;
  private isPaused = false;
  private isMute = false;
  private _volume = 50; // in percent

  private debugSoundManager = false;

  repeatMode: 'none' | 'single' | 'all' = 'none';

  private soundmanager = new PlayerSoundmanager2(this.dataService, this.ngZone);

  public readonly queue$: Observable<Pbj.Track[]> = this._items.asObservable();
  public readonly current$: Observable<Pbj.Track> = this._current.asObservable();

  constructor(
    private readonly dataService: DataService,
    private readonly messageService: MessageService,
    private readonly ngZone: NgZone
  ) {
    this.subscribeSoundPlayerEvents(this.soundmanager);
  }

  // <editor-fold desc="*** Queue ***">
  private clearQueue() {
    this.stop();
    this.changeCurrentItem(null);
    this.items.splice(0, this.items.length);
  }

  clear() {
    this.clearQueue();
    this.publish('Queue cleared');
  }

  private async addToQueue(item: Pbj.Base) {
    const items = await this.dataService.getAllTracksForItem(item); // TODO: think about that
    this.items.push(...items);
    return items;
  }

  async add(item: Pbj.Base) {
    const items = await this.addToQueue(item);
    this.publish(`Added ${items.length} items to the queue`);
  }

  private async deleteItemFromQueue(item: Pbj.Base) {
    const items = await this.dataService.getAllTracksForItem(item); // TODO: think about that
    items.map(aitem => {
      const itemidx = this.items.indexOf(aitem);
      if (itemidx >= 0) {
        this.items.splice(itemidx, 1);
      }
    }); // TODO: this is not working if item it twice in queue
    return items;
  }

  async remove(item: Pbj.Base) {
    const items = await this.deleteItemFromQueue(item);
    this.publish(`Removed ${items.length} items to the queue`);
  }

  async removeAll(items: Pbj.Base[]) {
    await Promise.all(items.map(async item => this.deleteItemFromQueue(item)));
    this.publish('Removed the items from the queue');
  }

  private checkCurrent() {
    if (!this.current || this.items.indexOf(this.current) < 0) { // TODO: this is not working if item it twice in queue
      (this.items.length) ? this.changeCurrentItem(this.first()) : this.clearQueue();
    }
  }

  async replace(item: Pbj.Base) {
    this.clearQueue();
    const items = await this.addToQueue(item);
    this.publish(`Replaced ${items.length} items to the queue`);
  }

  async replaceAll(items: Pbj.Track[]) {
    this.clearQueue();
    this.items.push(...items);
    this.publish(`Replaced ${items.length} items to the queue`);
  }

  async append(item: Pbj.Base) {
    return this.addToQueue(item);
  }

  async appendAll(items: Pbj.Base[]) {
    await Promise.all(items.map(item => { this.addToQueue(item).catch(e => console.error(e)); })).catch(e => console.error(e));
    this.publish('Appended the items to the queue');
  }

  async replaceAndPlay(item: Pbj.Base) {
    await this.replace(item);
    this.changeCurrentItem(this.first());
    this.play();
  }

  // <editor-fold desc="*** First Last Next Prev ***">

  first() {
    return this.items[0];
  }

  last() {
    return this.items[this.items.length - 1];
  }

  hasItems() {
    return !!this.items.length;
  }

  getNext() {
    if (!this.hasItems()) { return null; }
    if (!this.current) { return this.first(); }
    if (!this.hasNext()) { return null; }
    if (this.repeatMode === 'single') { return this.current; }
    const idx = this.items.indexOf(this.current); // TODO: this is not working if item it twice in queue
    if (idx === this.items.length - 1) { // we are the last
      if (this.repeatMode === 'all') { return this.first(); }
      return null; // no repeat
    }
    return this.items[idx + 1];
  }

  getPrev() {
    if (!this.hasItems()) { return null; }
    if (!this.current) { return this.first(); }
    if (!this.hasPrev()) { return null; }
    if (this.repeatMode === 'single') { return this.current; }
    const idx = this.items.indexOf(this.current); // TODO: this is not working if item it twice in queue
    if (idx === 0) { // we are the first
      if (this.repeatMode === 'all') { return this.last(); }
      return null; // no repeat
    }
    return this.items[idx - 1];
  }

  hasNext() {
    return !!this.current && ((this.repeatMode !== 'none') || (this.items.indexOf(this.current) < (this.items.length - 1))); // TODO: this is
    // not working if item it twice in queue
  }

  hasPrev() {
    return !!this.current && ((this.repeatMode !== 'none') || (this.items.indexOf(this.current) > 0)); // TODO: this is not working if item it twice in queue
  }

  next() {
    console.log('next');
    this.changeCurrentItem(this.getNext());
  }

  prev() {
    this.changeCurrentItem(this.getPrev());
  }

  // </editor-fold>

  /**
   * Fisher–Yates shuffle O(n)
   */
  shuffle() {

    let currentIndex = this.items.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.items[currentIndex];
      this.items[currentIndex] = this.items[randomIndex];
      this.items[randomIndex] = temporaryValue;
    }
    this.publish('Shuffled :)');
  }

  // </editor-fold>

  // <editor-fold desc="*** Player ***">

  private subscribeSoundPlayerEvents(soundManager: SoundManager): void {
    const wrapper = (txt: string) => {
      if (this.debugSoundManager) {
        console.log(txt, this.soundmanager.position(), this.soundmanager.speed(), this.soundmanager.volume(), this.soundmanager.audioSupport);
      }
    };
    soundManager.on(PlayerEvents.START, () => wrapper('START from soundmanager'));

    soundManager.on(PlayerEvents.BUFFERINGSTART, () => wrapper('buffering start from soundmanager'));
    soundManager.on(PlayerEvents.LOADING, () => wrapper('loading from soundmanager'));

    // Update duration if needed after the track is loaded
    soundManager.on(PlayerEvents.BUFFERINGEND, () => {
      const smDuration = this.soundmanager.duration() / 1000;
      if (smDuration && smDuration !== this.duration) {
        this.duration = smDuration;
      }
    });
    soundManager.on(PlayerEvents.FINISH, () => this.onEndPlaying());
    soundManager.on(PlayerEvents.TIME, time => {
      console.log('time event setting position');
      this.position = time / 1000;
    });
    soundManager.on(PlayerEvents.AUDIOERROR, err => console.error(err));

    soundManager.on(PlayerEvents.TOGGLE_PLAY_PAUSE, () => this.togglePlay());
    soundManager.on(PlayerEvents.SEEK_FWD, () => this.forward(5));
    soundManager.on(PlayerEvents.SEEK_BACK, () => this.rewind(5));
    soundManager.on(PlayerEvents.NEXT, () => this.next());
    soundManager.on(PlayerEvents.PREV, () => this.prev());
  }

  private changeCurrentItem(newCurrent: Pbj.Track) {
    this.current = newCurrent;
    console.log('change current', newCurrent);
    if (newCurrent) {
      this.duration = this.current.duration;
      this.position = 0;
      this.soundmanager.initialize(this.current, this.volume(), this.position, !this.playing(), e => console.error(e));
    } else {
      this.stop();
    }
  }

  isCurrentlyPlaying(track: Pbj.Base) {
    return this.isPlaying && this.isCurrent(track);
  }

  isCurrent(item: Pbj.Base) {
    return this.current && this.current.id === item.id;
  }

  isInQueue(item: Pbj.Base) {
    return !!this.items.find(track => track.id === item.id);
  }

  play() {
    console.log('play');
    this.isPlaying = true;
    this.isPaused = false;
    this.soundmanager.play();
  }

  playFrom(item: Pbj.Track) {
    const idx = this.items.indexOf(item); // TODO: this is not working if item it twice in queue
    this.stop();
    this.changeCurrentItem(this.items[idx]);
    this.play();
  }

  stop() {
    console.log('stop');
    this.duration = 0;
    this.position = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.soundmanager.stop();
  }

  pause() {
    console.log('pause play ');
    this.soundmanager.pause();
    this.isPlaying = false;
    this.isPaused = true;
  }

  resume() {
    console.log('resume play ');
    this.soundmanager.play();
    this.isPlaying = true;
    this.isPaused = false;
  }

  private onEndPlaying() {
    console.log('end playing');
    // this.next();
  }

  toggleRepeatMode() {
    this.repeatMode = this.repeatMode === 'none'
      ? 'single'
      : this.repeatMode === 'single'
        ? 'all'
        : 'none';
  }

  speed(speed: number): void {
    this.soundmanager.setSpeed(speed);
  }

  seek(time: number): void {
    if (this.current) {
      // only change position if its one second diff this is needed to prevent change of position to seek the current position
      if (Math.abs(time * 1000 - this.soundmanager.position()) >= 1000) {
        this.position = time;
        this.soundmanager.seek(this.position * 1000);
      }
    }
  }

  playing() {
    return this.isPlaying && !this.isPaused;
  }

  volume(percent?: number) {
    if (percent) {
      this._volume = percent;
      this.soundmanager.volume(this._volume);
    }
    return this.isMute ? 0 : this._volume;
  }

  forward(seconds: number): void {
    this.seek(this.soundmanager.position() + (seconds * 1000));
  }

  rewind(seconds: number): void {
    this.seek(Math.max(0, this.soundmanager.position() - (seconds * 1000)));
  }

  volumeUp(): void {
    this.volume(Math.min(100, this.volume() + 10));
  }

  volumeDown(): void {
    this.volume(Math.max(0, this.volume() - 10));
  }

  isMuted(): boolean {
    return this.isMute;
  }

  mute(): void {
    this.isMute = true;
    this.soundmanager.volume(0);
  }

  unmute(): void {
    this.isMute = false;
    this.soundmanager.volume(this._volume);
  }

  toggleMute(): void {
    this.isMuted() ? this.unmute() : this.mute();
  }

  togglePlay() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  currentLabel() {
    return Utils.getNameFromBase(this.current);
  }

  // </editor-fold>

  private publish(msg?: string) {
    if (msg) { this.messageService.message(msg); }
    // clone so update triggers
    this.items = [].concat(...this.items);
    this.checkCurrent();
  }
}
