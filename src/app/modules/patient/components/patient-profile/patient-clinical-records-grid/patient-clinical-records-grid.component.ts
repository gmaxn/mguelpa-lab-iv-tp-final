import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-clinical-records-grid',
  templateUrl: './patient-clinical-records-grid.component.html',
  styleUrls: ['./patient-clinical-records-grid.component.css']
})
export class PatientClinicalRecordsGridComponent implements OnInit {

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @Input() clinicalRecords: any[] = [];

  public index:number = 0;
  
  @Input() filtered: any[] = [];

  public _filterTerm: string = '';

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.clinicalRecords;
  }

  constructor() { }

  ngOnInit(): void { }

  previous() {
    if(this.index > 0) {
      this.index--;
    }
  }

  next() {
    if(this.index +1 < this.clinicalRecords.length) {
      this.index++;
    }
  }
  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clinicalRecords.filter(
      (a: any) =>  (
        `${a.specialist.firstname, a.specialist.lastname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
           a.speciality.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  trigger(action:string, appointment: any) {
    this.action.emit({
      action: action,
      appointment: appointment
    });
  }

  getValues(index:number, value:string) {
    return (this.clinicalRecords[index][value]);
  }

  getDynamicFields(index:number) {
    return this.clinicalRecords[index].dynamic;
  }
}
