import { Component, Input, OnInit } from '@angular/core';
import { UserClaims } from 'src/app/models/user-claims';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpecialistService } from '../../../services/specialst.service';

@Component({
  selector: 'app-specialist-patient-appointment',
  templateUrl: './specialist-patient-appointment.component.html',
  styleUrls: ['./specialist-patient-appointment.component.css']
})
export class SpecialistPatientAppointmentComponent implements OnInit {

  constructor() {}

  ngOnInit(): void { }

}
