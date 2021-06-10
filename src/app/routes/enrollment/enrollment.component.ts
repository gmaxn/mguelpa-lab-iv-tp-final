import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNameEventService } from 'src/app/services/route-name-event.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(
    private routeName: RouteNameEventService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  redirect(mode:string) {
    switch (mode) {
      case 'specialist':
        // route.data = { animation: 'SpecialistRegistration' }
        //this.routeName.emitChange('specialist');
        this.router.navigate(['specialist/enrollment']);
        break;

      case 'patient':
        // route.data = { animation: 'PatientRegistration' }
        //this.routeName.emitChange('patient');
        this.router.navigate(['patient/enrollment']);
        break;
    }
  }
}
