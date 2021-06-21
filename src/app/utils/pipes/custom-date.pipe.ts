import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  private months: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  private days: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  transform(date: Date): string {
    const day = date?.getDay();
    const number = date?.getDate();
    const month = date?.getMonth();
    return `${this.days[day]} ${number} de ${this.months[month]} del ${date?.getFullYear()}`;
  }
}