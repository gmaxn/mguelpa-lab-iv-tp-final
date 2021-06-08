import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PatientService } from 'src/app/modules/patient/services/patient.service';

@Component({
  selector: 'app-specialist-patients-clinical-records',
  templateUrl: './specialist-patients-clinical-records.component.html',
  styleUrls: ['./specialist-patients-clinical-records.component.css']
})
export class SpecialistPatientsClinicalRecordsComponent implements OnInit {

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @Input() patientId: string = '';

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

  constructor(
    private patiService: PatientService
  ) { }

  ngOnInit(): void {
    this.patiService.getClinicalRecordsById(this.patientId).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });
      this.clinicalRecords = res;
      this.filtered = this.clinicalRecords;
    });
  }

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
      (cr: any) =>  (
        `${cr.patient.firstname, cr.patient.lastname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
           cr.patient.username.toLocaleLowerCase().indexOf(filterBy) !== -1
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
