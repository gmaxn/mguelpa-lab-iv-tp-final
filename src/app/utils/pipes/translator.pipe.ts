import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translator'
})
export class TranslatorPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'patient':
        return 'paciente';
        break;
      case 'specialist':
        return 'especialista';
        break;
      case 'admin':
        return 'administrador';
        break;
      default:
        return '';
        break;
    }
    return '';
  }

}
