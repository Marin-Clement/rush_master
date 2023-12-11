import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monkeyKingExeception'
})
export class MonkeyKingExeceptionPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'MonkeyKing' ? 'Wukong' : value;
  }
}
