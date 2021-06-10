import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  private days: string [] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  private months: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  @Input() item:any;

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(appointment:any) {
    this.response.emit({
      succeed: true, 
      data:'ok'
    });
  }

  reject() {
    this.response.emit({
      succeed: false, 
      data:'cancel'
    });
  }

  toDateString(date:Date) {
    return `${this.days[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()} a las ${date.toTimeString()}`;  
  }
}