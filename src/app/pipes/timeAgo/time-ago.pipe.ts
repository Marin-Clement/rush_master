import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, parseISO } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: number): string {
    const createdAt = parseISO(new Date(value).toISOString());
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }
}
