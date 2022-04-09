import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'track'
})
export class TrackPipe implements PipeTransform {

  transform(value: number, max: number): any {
    let result = value ? value.toString() : '';
    const maxLen = max ? max.toString().length : 0;
    while (maxLen > result.length) {
      result = `0${result}`;
    }
    return result;
  }

}
