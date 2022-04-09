import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }
    return new Date(value).toLocaleDateString();
  }

}
