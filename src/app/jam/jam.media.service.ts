// THIS FILE IS GENERATED, DO NOT EDIT MANUALLY

import {Injectable} from '@angular/core';

import {JamBaseService} from './jam.base.service';
import {JamParameters} from './model/jam-rest-params';

@Injectable()
export class JamMediaService {

  constructor(private base: JamBaseService) {
  }

  /**
   * stream a media file in a format // Rights needed: stream
   */
  stream_url(id: string, format?: JamParameters.AudioFormatType): string {
    return this.base.buildRequestUrl(`stream/${id}${format !== undefined ? `.${format}` : ''}`);
  }

  /**
   * stream a media file in a format // Rights needed: stream
   */
  async stream_binary(id: string, format?: JamParameters.AudioFormatType): Promise<ArrayBuffer> {
    return this.base.binary(`stream/${id}${format !== undefined ? `.${format}` : ''}`);
  }

  /**
   * get peaks waveform data as svg | json | binary // Rights needed: stream
   */
  waveform_url(id: string, format?: JamParameters.WaveformFormatType): string {
    return this.base.buildRequestUrl(`waveform/${id}${format !== undefined ? `.${format}` : ''}`);
  }

  /**
   * get peaks waveform data as svg | json | binary // Rights needed: stream
   */
  async waveform_binary(id: string, format?: JamParameters.WaveformFormatType): Promise<ArrayBuffer> {
    return this.base.binary(`waveform/${id}${format !== undefined ? `.${format}` : ''}`);
  }

  /**
   * get peaks waveform data as svg with a width // Rights needed: stream
   */
  waveform_svg_url(id: string, width: number): string {
    return this.base.buildRequestUrl(`waveform_svg/${id}-${width}.svg`);
  }

  /**
   * get peaks waveform data as svg with a width // Rights needed: stream
   */
  async waveform_svg_binary(id: string, width: number): Promise<ArrayBuffer> {
    return this.base.binary(`waveform_svg/${id}-${width}.svg`);
  }

  /**
   * download object as binary archive by id // Rights needed: stream
   */
  download_url(id: string, format?: JamParameters.DownloadFormatType): string {
    return this.base.buildRequestUrl(`download/${id}${format !== undefined ? `.${format}` : ''}`);
  }

  /**
   * download object as binary archive by id // Rights needed: stream
   */
  async download_binary(id: string, format?: JamParameters.DownloadFormatType): Promise<ArrayBuffer> {
    return this.base.binary(`download/${id}${format !== undefined ? `.${format}` : ''}`);
  }

}
