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
    this.filtered = this.filterTerm ? this.performFilter2(this._filterTerm) : this.appointments;
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
  
  performFilter2(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.appointments.filter(a => {
      const clinicalRecords = this.records.filter(cr => cr.appointment.uid === a.uid);
      const dynamicFields = clinicalRecords.map(cr => cr.dynamic)
      const result: any[] = []
      console.log(this.records)
      dynamicFields.map(arr => {
        arr.map((a: any) => result.push(a));
      });
      const result2: any[] = [];
      result.map((r: any) => {
        const key = Object.keys(r)[0];
        const value = <string>Object.values(r)[0];
        if (key.toLocaleLowerCase().indexOf(filterBy) !== -1) {
          result2.push(key);
        }
        if (value.toLocaleLowerCase().indexOf(filterBy) !== -1) {
          result2.push(value);;
        }
        if (`${key} ${value}`.toLocaleLowerCase().indexOf(filterBy) !== -1) {
          result2.push(key);;
        }
      })
      console.log(result2);
      return (
        `${a.patient.lastname} ${a.patient.firstname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
        a.speciality.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        result2.length > 0
    });
  }

  trigger(action:string, appointment: Appointment) {
    this.action.emit({
      action: action,
      appointment: appointment
    });
  }
}

