import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, userType: string): string {
    switch (userType) {
      case 'patient':
        return this.getPatientValue(value);
        break;
      case 'specialist':
        return this.getPatientValue(value);
        break;
    }
    return '';
  }

  getPatientValue(value: string) {
    let aux = '';
    switch (value) {
      case 'taken':
        aux = 'tomado';
        break;
      case 'finalized':
        aux = 'finalizado';
        break;
      case 'accepted':
        aux = 'aceptado';
        break;
      case 'rejected':
        aux = 'rechazado';
        break;
    }
    return aux;
  }
}
