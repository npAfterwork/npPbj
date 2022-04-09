import {Utils} from '../model/utils';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform {

  transform(value: number): any {
    return Utils.count(value);
  }

}
