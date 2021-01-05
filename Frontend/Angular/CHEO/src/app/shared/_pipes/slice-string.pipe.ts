import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length > 30){
      return value.slice(0,30).trim() + "...";
    }
    else {
      return value;
    }
  }

}
