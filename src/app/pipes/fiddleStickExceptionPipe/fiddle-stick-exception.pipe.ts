import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiddleStickException'
})
export class FiddleStickExceptionPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'FiddleSticks' ? 'Fiddlesticks' : value;
  }
}
