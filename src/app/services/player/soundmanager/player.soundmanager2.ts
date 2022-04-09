import {Pbj} from '../../../model/model';
import {DataService} from '../../data/data.service';
import {PlayerEvents, SoundManager, SoundPlayerAudioSupport} from '../player.interface';
// @ts-ignore
import soundmanager2 from './soundmanager2';
import {NgZone} from '@angular/core';

declare const soundManager: soundmanager2.SoundManager;

/**
 * This class take responsibility to play audio. Just it.
 */
export class PlayerSoundmanager2 implements SoundManager {
  private soundObject: soundmanager2.SMSound;
  private subscribers: {
    [key: number]: any[];
  } = {};
  private currentTrack: Pbj.Track;
  audioSupport: SoundPlayerAudioSupport;

  constructor(private dataService: DataService, private ngZone: NgZone) {
    soundManager.debugMode = false;
    soundManager.forceUseGlobalHTML5Audio = true;
    soundManager.useHTML5Audio = true;
    soundManager.preferFlash = false;
    //    this.subscribeSoundPlayerEvents(this);
    this.audioSupport = this.getAudioSupport();
    this.initMediaSession();
  }

  // <editor-fold desc="*** MediaSession ***">

  private initMediaSession(): void {
    if ('mediaSession' in navigator) {
      console.log('MEDIA SESSION INIT');
      const mediaSession = navigator.mediaSession;
      mediaSession.setActionHandler('play', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION PLAY');
          this.publish(PlayerEvents.TOGGLE_PLAY_PAUSE, undefined);
        });
      });
      mediaSession.setActionHandler('pause', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION PAUSE');
          this.publish(PlayerEvents.TOGGLE_PLAY_PAUSE, undefined);
        });
      });
      mediaSession.setActionHandler('seekbackward', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION SEEK BACK');
          this.publish(PlayerEvents.SEEK_BACK, undefined);
        });
      });
      mediaSession.setActionHandler('seekforward', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION SEEK FORWARD');
          this.publish(PlayerEvents.SEEK_FWD, undefined);
        });
      });
      mediaSession.setActionHandler('previoustrack', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION SEEK PREV');
          this.publish(PlayerEvents.PREV, undefined);
        });
      });
      mediaSession.setActionHandler('nexttrack', () => {
        this.ngZone.run(() => {
          console.log('MEDIA SESSION SEEK NEXT');
          this.publish(PlayerEvents.NEXT, undefined);
        });
      });
    }
  }

  private setMediaSessionsPlaybackState(play: boolean) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = play ? 'playing' : (this.currentTrack ? 'paused' : 'none');
    }
  }

  private setMediaSessionsPositionState() {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration:     this.duration(),
        playbackRate: this.speed(),
        position:     this.position()
      });
    }
  }

  private setMediaSession(track: Pbj.Track): void {
    console.log('Setting MEDIA SESSION', track);
    if ('mediaSession' in navigator) {
      const mediaSession = navigator.mediaSession;
      const sizes = [96, 128, 192, 256, 384, 512];
      const artwork = sizes.map(size =>
        ({
          src:   this.dataService.getImageUrl(track.id, size),
          sizes: `${size}x${size}`,
          type:  'image/png'
        }));
      mediaSession.metadata = new MediaMetadata({
        title:  track.tag ? track.tag.title : track.name,
        artist: track.tag ? track.tag.artist : undefined,
        album:  track.tag ? track.tag.album : undefined,
        artwork
      });
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Build Sound and Helper ***">

  getAudioSupport(): SoundPlayerAudioSupport {
    const result: SoundPlayerAudioSupport = {
      formats: Object.keys(soundManager.audioFormats)
    };
    result.formats.sort();
    return result;
  }

  buildSoundObject(track: Pbj.Track, volume, position: number | undefined): soundmanager2.SMSound {
    return soundManager.createSound({
      url:            this.dataService.getStreamUrl(track.id),
      id:             track.id,
      volume,
      autoLoad:       true,
      autoPlay:       false,
      position,
      onbufferchange: () => {
        this.ngZone.run(() => {
          this.publish(PlayerEvents.BUFFERINGSTART);
        });
      },
      ondataerror:    () => {
        this.ngZone.run(() => {
          this.setMediaSessionsPlaybackState(false);
          this.publish(PlayerEvents.AUDIOERROR);
        });
      },
      whileloading:   () => {
        this.ngZone.run(() => {
          this.publish(PlayerEvents.LOADING, this.bytesLoaded());
        });
      },
      onfinish:       () => {
        this.ngZone.run(() => {
          this.setMediaSessionsPlaybackState(false);
          this.publish(PlayerEvents.FINISH);
        });
      },
      onload:         (ready: boolean) => {
        this.ngZone.run(() => {
          this.publish(PlayerEvents.BUFFERINGEND, ready);
        });
      },
      onpause:        () => {
        this.ngZone.run(() => {
          this.setMediaSessionsPlaybackState(false);
        });
      },
      onplay:         () => {
        this.ngZone.run(() => {
          this.setMediaSessionsPlaybackState(true);
          this.publish(PlayerEvents.START);
        });
      },
      onresume:       () => {
        this.ngZone.run(() => {

          this.setMediaSessionsPlaybackState(true);
        });
      },
      onstop:         () => {
        this.ngZone.run(() => {
          this.setMediaSessionsPlaybackState(false);
          this.publish(PlayerEvents.FINISH);

        });
      },
      whileplaying:   () => {
        this.ngZone.run(() => {
          const time = this.position();
          this.setMediaSessionsPositionState();
          this.publish(PlayerEvents.TIME, time);
        });
      }
    });
  }

  initialize(track: Pbj.Track, volume: number, startSeek?: number, paused?: boolean, errCallback?: (e: Error) => void): void {
    this.unloadCurrent();
    let soundObject = soundManager.getSoundById(track.id);
    if (!soundObject) {
      soundObject = this.buildSoundObject(track, volume, startSeek);
      if (!soundObject) {
        errCallback(new Error('Error while create sound'));
        return;
      }
      this.currentTrack = track;
    }
    if (!paused) {
      soundObject.play();
    }
    this.soundObject = soundObject;
    this.setMediaSession(track);
    this.setMediaSessionsPlaybackState(!paused);
  }

  hasSound() {
    return !!this.soundObject;
  }

  on(event: number, handler: (data: any) => void): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(handler);
  }

  private bytesLoaded(): number {
    return this.soundObject ? (this.soundObject.bytesLoaded || 0) : 0;
  }

  private publish(event: number, data?: any): void {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(handler => {
        handler(data);
      });
    }
  }

  private unloadCurrent(): void {
    if (this.currentTrack) {
      soundManager.unload(this.currentTrack.id);
      soundManager.destroySound(this.currentTrack.id);
      this.currentTrack = undefined;
    }
  }

  // </editor-fold>

  duration(): number {
    return this.hasSound() ? (this.soundObject.duration || 0) : 0;
  }

  volume(vol?: number): number | undefined {
    if (this.hasSound() && vol) { this.soundObject.volume = vol; }
    return this.hasSound() ? this.soundObject.volume : undefined;
  }

  pause(): void {
    if (this.hasSound()) {
      this.soundObject.pause();
    }
  }

  play(): void {
    if (this.hasSound()) {
      if (this.soundObject.playState === 0) {
        this.soundObject.play();
      } else {
        this.soundObject.resume();
      }
    }
  }

  position(): number {
    return this.hasSound() ? (this.soundObject.position || 0) : 0;
  }

  preload(track: Pbj.Track): void {
    // nope? // TODO: this could be nice (transition)
  }

  seek(time: number): void {
    if (this.hasSound()) {
      this.soundObject.setPosition(time);
    }
  }

  setSpeed(speed: number): void {
    if (this.hasSound()) {
      this.soundObject.setPlaybackRate(speed);
    }
  }

  speed(): number {
    if (this.soundObject) {
      // TODO: is there no api for getting internal playbackRate?
      return this.soundObject._iO.playbackRate;
    }
    return 1;
  }

  stop(): void {
    if (this.soundObject) {
      this.soundObject.stop();
      this.unloadCurrent();
      this.currentTrack = undefined;
      this.setMediaSessionsPlaybackState(false);
    }
  }

}
