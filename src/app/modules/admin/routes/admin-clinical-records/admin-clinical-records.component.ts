import { Component, OnInit } from '@angular/core';
import { UserClaims } from 'src/app/models/user-claims';
import { SpecialistService } from 'src/app/modules/specialist/services/specialst.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';

@Component({
  selector: 'app-admin-clinical-records',
  templateUrl: './admin-clinical-records.component.html',
  styleUrls: ['./admin-clinical-records.component.css']
})
export class AdminClinicalRecordsComponent implements OnInit {

  public specialistPatients: any[] = [];

  public selectedPatient: any;

  private currentUser: UserClaims = this.auth.getCurrentUserCredentials();

  public showModal: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private appoService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.appoService.getAll().subscribe(res => {
      let patients:any[] = [];
      res.map(a => {
        if(patients.filter((p:any) => p.uid == a.patient.uid).length < 1) {
          patients.push(a.patient);
        }
      })
      this.specialistPatients = patients;
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
}
