import { Component, OnInit } from '@angular/core';
import { UserClaims } from 'src/app/models/user-claims';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpecialistService } from '../../services/specialst.service';

// import * as $ from 'jquery';


@Component({
  selector: 'app-specialist-patients',
  templateUrl: './specialist-patients.component.html',
  styleUrls: ['./specialist-patients.component.css']
})
export class SpecialistPatientsComponent implements OnInit {
  
  private currentUser: UserClaims = this.auth.getCurrentUserCredentials();
  
  public specialistPatients: any[] = [];

  constructor(
    private specService: SpecialistService,
    private auth: AuthenticationService
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

    // $(document).ready(function () {
    //     $('[data-toggle="tooltip"]').tooltip();
    // });
  }

}
