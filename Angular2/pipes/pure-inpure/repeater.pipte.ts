import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'repeat',
  pure: false
})
export class Repeater implements PipeTransform {
  transform(value: any[]): any[] {
    return value.filter((val, i)=> i%2==0);
  }
}
