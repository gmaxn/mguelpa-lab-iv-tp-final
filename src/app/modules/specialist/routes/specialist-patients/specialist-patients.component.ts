import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Patient } from 'src/app/models/patient';
import { UserClaims } from 'src/app/models/user-claims';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpecialistService } from '../../services/specialst.service';



@Component({
  selector: 'app-specialist-patients',
  templateUrl: './specialist-patients.component.html',
  styleUrls: ['./specialist-patients.component.css']
})
export class SpecialistPatientsComponent implements OnInit {

  public selectedAppointment?: Appointment;

  @Input() array: any[] = [];
  
  
  public selectedItem: any;
  
  @Input() filtered2: any[] = [];
  public _filterTerm2: string = '';

  public get filterTerm2(): string {
    return this._filterTerm2;
  }

  public set filterTerm2(value: string) {
    this._filterTerm2 = value;
    this.filtered2 = this.filterTerm2 ? this.performFilter2(this._filterTerm2) : this.patientAppointments;
  }

  @Input() filtered1: any[] = [];
  public _filterTerm1: string = '';

  public get filterTerm1(): string {
    return this._filterTerm1;
  }

  public set filterTerm1(value: string) {
    this._filterTerm1 = value;
    this.filtered1 = this.filterTerm1 ? this.performFilter1(this._filterTerm1) : this.specialistPatients;
  }
  
  private currentUser: UserClaims = this.auth.getCurrentUserCredentials();
  
  public specialistPatients: any[] = [];

  public selectedPatient: any;

  public showModal: boolean = false;

  public patientAppointments: any[] = [];

  constructor(
    private specService: SpecialistService,
    private auth: AuthenticationService,
    private patiService: PatientService
  ) { 

  }

  reset() {
    this.selectedPatient = null;
    this.patientAppointments = [];
    this.showModal = false;
  }

  ngOnInit(): void {
    this.specService.getSpecialistAppointments(this.currentUser.uid).subscribe(res => {
      let patients:any[] = [];
      res.map(a => {
        if(patients.filter((p:any) => p.uid == a.patient.uid).length < 1) {
          patients.push(a.patient);
        }
      })
      this.specialistPatients = patients;
      this.filtered1 = patients;

    })


  }

  onSelection(patient: any) {
    this.selectedPatient = patient;
    this.patiService.getPatientAppointments(this.selectedPatient.uid).subscribe(res => {
      res.map(app => app.date = new Date((<any>app.date).seconds * 1000));
      this.patientAppointments = res.filter(app => app.specialist.uid === this.currentUser.uid);
      this.filtered2 = this.patientAppointments;
    })
  }

  onClinicalRecordSelected(patient:any) {
    this.selectedPatient = patient;
    this.showModal = true;
  }

  onModalResponse(response: any) {
    if(response.succeed) {
      
    }
    this.showModal = false;
  }

  performFilter1(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.specialistPatients.filter(
      (p: any) =>  (
        p.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        p.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        p.username.toLocaleLowerCase().indexOf(filterBy) !== -1
    ))
  }

  performFilter2(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.patientAppointments.filter(
      (a: any) =>  (
        a.patient.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        a.patient.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        a.speciality.toLocaleLowerCase().indexOf(filterBy) !== -1
    ))
  }

  openReview(appointment:Appointment) {
    this.selectedAppointment = appointment;
    this.showModal = true;
  }
}

