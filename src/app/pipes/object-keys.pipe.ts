import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'objectkeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: any): string[] {
    return Object.keys(value);
  }

}
