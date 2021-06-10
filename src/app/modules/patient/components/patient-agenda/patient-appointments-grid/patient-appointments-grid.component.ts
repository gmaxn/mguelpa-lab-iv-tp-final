import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-patient-appointments-grid',
  templateUrl: './patient-appointments-grid.component.html',
  styleUrls: ['./patient-appointments-grid.component.css']
})
export class PatientAppointmentsGridComponent implements OnInit {

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @Input() appointments: Appointment[] = [];
  
  @Input() filtered: Appointment[] = [];

  public _filterTerm: string = '';

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.appointments;
  }

  constructor() { }

  ngOnInit(): void { }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.appointments.filter(
      (a: any) =>  (
        `${a.specialist.firstname, a.specialist.lastname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
           a.speciality.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  trigger(action:string, appointment: Appointment) {
    this.action.emit({
      action: action,
      appointment: appointment
    });
  }
}