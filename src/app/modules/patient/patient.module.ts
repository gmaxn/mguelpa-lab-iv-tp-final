import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './routes/patient-profile/patient-profile.component';
import { PatientClinicalRecordsGridComponent } from './components/patient-profile/patient-clinical-records-grid/patient-clinical-records-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientAppointmentTabComponent } from './components/patient-appointments/patient-appointment-tab/patient-appointment-tab.component';
import { PatientAppointmentGridComponent } from './components/patient-appointments/patient-appointment-grid/patient-appointment-grid.component';
import { PatientAppointmentModalComponent } from './components/patient-agenda/patient-appointment-modal/patient-appointment-modal.component';
import { PatientAgendaComponent } from './routes/patient-agenda/patient-agenda.component';
import { PatientAppointmentsGridComponent } from './components/patient-agenda/patient-appointments-grid/patient-appointments-grid.component';
import { PatientEnrollmentComponent } from './routes/patient-enrollment/patient-enrollment.component';
import { AppCommonModule } from 'src/app/app-common.module';


@NgModule({
  declarations: [
    PatientProfileComponent,
    PatientClinicalRecordsGridComponent,


    PatientEnrollmentComponent,
    PatientAppointmentTabComponent,
    PatientAppointmentGridComponent,
    PatientAppointmentModalComponent,
    PatientAgendaComponent,
    PatientAppointmentsGridComponent,
    PatientAppointmentModalComponent
  ],
  imports: [
    PatientRoutingModule,
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
