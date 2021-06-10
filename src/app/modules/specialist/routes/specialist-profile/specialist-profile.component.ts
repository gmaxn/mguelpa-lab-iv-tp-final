import { Component, OnInit } from '@angular/core';
import { ProfileInformation } from 'src/app/models/profile-information';
import { Specialist } from 'src/app/models/specialist';
import { UserClaims } from 'src/app/models/user-claims';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpecialistService } from '../../services/specialst.service';

@Component({
  selector: 'app-specialist-profile',
  templateUrl: './specialist-profile.component.html',
  styleUrls: ['./specialist-profile.component.css']
})
export class SpecialistProfileComponent implements OnInit {

  public enabled: boolean = false;

  public speciality: any;

  public user: UserClaims | any;

  public userData: ProfileInformation<Specialist> | any;

  constructor(
    private auth: AuthenticationService,
    private specialist: SpecialistService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();
    this.specialist.getUserData(this.user!.uid).subscribe(specialist => {
      this.userData = specialist;
    });
  }
  getUserSpecialities() {
    return this.user!.roles.filter((r: string) => (r !== 'admin' && r !== 'specialist' && r !== 'patient' && r !== 'user'))
  }
  enableScheduler() {
    this.enabled = true;
  }
}