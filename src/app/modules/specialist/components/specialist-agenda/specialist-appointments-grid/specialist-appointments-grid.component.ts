import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { ClinicalRecord } from 'src/app/models/clinical-record';

@Component({
  selector: 'app-specialist-appointments-grid',
  templateUrl: './specialist-appointments-grid.component.html',
  styleUrls: ['./specialist-appointments-grid.component.css']
})
export class SpecialistAppointmentsGridComponent implements OnInit {

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @Input() appointments: Appointment[] = [];
  
  @Input() filtered: Appointment[] = [];

  @Input() records: ClinicalRecord[] = [];

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
        `${a.patient.firstname, a.patient.lastname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
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

