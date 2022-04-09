import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'groupByMod'
})
export class GroupByModPipe implements PipeTransform {

  transform(value: any[], mod: number, grid = false): any {
    const result = [];
    let current = [];
    value.forEach((item, idx) => {
      current.push(item);
      if ((idx + 1) % mod === 0) {
        result.push(current);
        current = [];
      }
    });
    if (current.length > 0) {
      while (grid && current.length < mod) {
        current.push(null);
      }
      result.push(current);
    }
    return result;
  }

}
