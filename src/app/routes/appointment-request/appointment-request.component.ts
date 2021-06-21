import { Component, ElementRef, OnInit } from '@angular/core';
import { ProfileInformation } from 'src/app/models/profile-information';
import { Specialist } from 'src/app/models/specialist';
import { Speciality } from 'src/app/models/speciality';
import { SpecialistService } from 'src/app/modules/specialist/services/specialst.service';
import { SpecialityService } from 'src/app/services/speciality.service';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.css']
})
export class AppointmentRequestComponent implements OnInit {

  public enabled:boolean = false;

  public specialists:ProfileInformation<Specialist>[] = [];

  public selectedSpecialist: ProfileInformation<Specialist> = this.specialists[0];
  
  public specialities: Speciality[] = [];

  public selectedSpeciality: Speciality = this.specialities[0];

  public mode: string = 'specialist';

  public speciality: string = ''

  constructor(
    private sp: SpecialistService,
    private ss: SpecialityService,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.sp.getAllSpecialists().subscribe({
      next: users => {
        this.specialists = users;
      }
    });

    this.ss.getSpecialities().subscribe({
      next: specialities => {
        this.specialities = specialities;
      }
    })
  }

  getSpecialities(roles: string[]): Speciality[] {
    let result:Speciality[] = []
    roles.map(r => {
      let speciality = this.specialities.filter(s => s.name === r)[0];
      if(speciality) {
        result.push({
          imageUrl: speciality.imageUrl,
          name: speciality.name,
          isActive: speciality.isActive
        });
      }
    });
    return result;
  }

  getSpecialitiesNames(roles:string[]) {
    return roles.filter(r => r !== 'admin' && r !== 'user' && r !== 'specialist' && r !== 'patient')
  }

  switchMode(mode: string, specialist: ProfileInformation<Specialist>) {
    this.mode = mode;
    this.selectedSpecialist = specialist;
  }

  goBack(mode:string) {
    switch(mode) {
      case 'specialities':
        this.mode = 'specialist';
        break;
      case 'appointment':
        this.mode = 'specialities';
        break;
    }
  }

  selectSpeciality(speciality: Speciality) {
    this.selectedSpeciality = speciality;
    this.mode = 'appointment';
    //this.elRef.nativeElement.style.setProperty('background-color', 'white')
  }

  getUserSpecialities() {
    //return this.user.roles.filter((r: string) => (r !== 'admin' && r !== 'specialist' && r !=='patient' && r !=='user'))
  }

  enableScheduler() {
    this.enabled = true;
  }
}
