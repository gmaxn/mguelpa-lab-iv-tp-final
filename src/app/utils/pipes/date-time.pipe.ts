import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(date: Date): string {
    const number = date?.getDate();
    const month = date?.getMonth();
    return `${number}/${month+1}/${date?.getFullYear()} ${date.toLocaleTimeString()}`;
  }

}
