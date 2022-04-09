import {Utils} from '../model/utils';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, hours = false): any {
    return Utils.duration(value, hours);
  }

}
