import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-appointment-grid',
  templateUrl: './patient-appointment-grid.component.html',
  styleUrls: ['./patient-appointment-grid.component.css']
})
export class PatientAppointmentGridComponent implements OnInit {

  @Input() appointments: any[] = [];

  @Output() cancelation: EventEmitter<any> = new EventEmitter<any>();

  @Output() displayDetails: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void { }

  cancel(appointment: any) {
    this.cancelation.emit(appointment);
  }

  details(appointment: any) {
    this.displayDetails.emit(appointment);
  }
}
