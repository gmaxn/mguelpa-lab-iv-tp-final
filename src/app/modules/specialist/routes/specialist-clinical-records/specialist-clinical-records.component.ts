import { Component, OnInit } from '@angular/core';
import { UserClaims } from 'src/app/models/user-claims';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpecialstService } from '../../services/specialst.service';

@Component({
  selector: 'app-specialist-clinical-records',
  templateUrl: './specialist-clinical-records.component.html',
  styleUrls: ['./specialist-clinical-records.component.css']
})
export class SpecialistClinicalRecordsComponent implements OnInit {

  public specialistPatients: any[] = [];

  public selectedPatient: any;

  private currentUser: UserClaims = this.auth.getCurrentUserCredentials();

  public showModal: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private specService: SpecialstService
  ) { }

  ngOnInit(): void {
    this.specService.getSpecialistAppointments(this.currentUser.uid).subscribe(res => {
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