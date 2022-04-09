import {Pbj} from '../../model/model';

export class PlayerEvents {
  static START = 2;
  static FINISH = 6;
  static BUFFERINGSTART = 9;
  static BUFFERINGEND = 10;
  static AUDIOERROR = 11;
  static TIME = 12;
  static LOADING = 18;
  // Media Session
  static NEXT = 20;
  static PREV = 21;
  static SEEK_FWD = 22;
  static SEEK_BACK = 23;
  static TOGGLE_PLAY_PAUSE = 24;
}

export interface SoundPlayerAudioSupport {
  formats: string[];
}

export interface SoundManager {
  initialize(track: Pbj.Track, volume: number, startSeek: number | undefined, paused: boolean, callback: (e: Error) => void): void;

  getAudioSupport(): SoundPlayerAudioSupport;

  play(): void;

  pause(): void;

  stop(): void;

  setSpeed(speed: number): void;

  speed(): number;

  seek(time: number): void;

  position(): number;

  duration(): number;

  volume(vol?: number): number;

  on(event: number, handler: (data: any) => void): void;

  preload(track: Pbj.Track): void;
}
