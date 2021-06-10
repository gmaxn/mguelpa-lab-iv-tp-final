import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-admin-patient-grid',
  templateUrl: './admin-patient-grid.component.html',
  styleUrls: ['./admin-patient-grid.component.css']
})
export class AdminPatientGridComponent implements OnInit {

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @Input() array: any[] = [];
  
  @Input() filtered: any[] = [];

  @Output() downloadPDF: EventEmitter<any> = new EventEmitter<any>();

  @Output() downloadCSV: EventEmitter<any> = new EventEmitter<any>();


  public _filterTerm: string = '';

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.array;
  }

  constructor() { }

  ngOnInit(): void { }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.array.filter(
      (u: any) =>  (
        u.claims.username.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
        u.claims.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 || 
        u.claims.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1  
      );
  }

  onDownloadCSV(patient: any) {
    this.downloadCSV.emit(patient.claims.uid);
  }

  onDownloadPDF(patient: any) {
    this.downloadPDF.emit(patient.claims.uid);
  }

  trigger(action:string, appointment: Appointment) {
    this.action.emit({
      action: action,
      appointment: appointment
    });
  }
}