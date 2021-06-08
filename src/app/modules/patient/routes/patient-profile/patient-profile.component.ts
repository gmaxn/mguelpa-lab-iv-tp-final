import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ProfileInformation } from 'src/app/models/profile-information';
import { UserClaims } from 'src/app/models/user-claims';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  public enabled: boolean = true;

  public speciality: any;

  public user: UserClaims | any;

  public userData: ProfileInformation<Patient> | any;

  public clinicalRecords: any[] = [];

  constructor(
    private auth: AuthenticationService,
    private patiService: PatientService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();
    this.patiService.getUserData(this.user!.uid).subscribe(patient => {
      this.userData = patient;
    });

    this.patiService.getClinicalRecordsById(this.user!.uid).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });
      this.clinicalRecords = res;
    });
  }
  getUserSpecialities() {
    return this.user!.roles.filter((r: string) => (r !== 'admin' && r !== 'specialist' && r !== 'patient' && r !== 'user'))
  }
  enableScheduler() {
    this.enabled = true;
  }
}