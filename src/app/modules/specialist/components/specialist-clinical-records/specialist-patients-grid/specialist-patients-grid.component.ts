import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-specialist-patients-grid',
  templateUrl: './specialist-patients-grid.component.html',
  styleUrls: ['./specialist-patients-grid.component.css']
})
export class SpecialistPatientsGridComponent implements OnInit {
  
  public showModal: boolean = false;

  @Output() clinicalRecordSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input() array: any[] = [];
  
  @Input() filtered: any[] = [];

  public selectedItem: any;

  public _filterTerm: string = '';

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.array;
  }

  constructor() { }

  ngOnInit(): void { 
    // console.log(this.array);
  }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.array.filter(
      (p: any) =>  (
        p.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        p.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        p.username.toLocaleLowerCase().indexOf(filterBy) !== -1
    ))
  }

  openClinicalRecord(selectedItem: any) {
    this.clinicalRecordSelected.emit(selectedItem);
    this.showModal = true;
  }


  // trigger(action:string, appointment: Appointment) {
  //   this.action.emit({
  //     action: action,
  //     appointment: appointment
  //   });
  // }
}
