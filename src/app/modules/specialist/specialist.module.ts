import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialistPatientsClinicalRecordsComponent } from './components/specialist-clinical-records/specialist-patients-clinical-records/specialist-patients-clinical-records.component';
import { SpecialistClinicalRecordsComponent } from './routes/specialist-clinical-records/specialist-clinical-records.component';
import { SpecialistRecordsModalComponent } from './components/specialist-clinical-records/specialist-records-modal/specialist-records-modal.component';
import { SpecialistPatientsGridComponent } from './components/specialist-clinical-records/specialist-patients-grid/specialist-patients-grid.component';
import { SpecialistProfileComponent } from './routes/specialist-profile/specialist-profile.component';
import { SpecialistAgendaComponent } from './routes/specialist-agenda/specialist-agenda.component';
import { SpecialistRegistrationComponent } from './routes/specialist-registration/specialist-registration.component';
import { SpecialitySelectorComponent } from './components/specialist-registration/speciality-selector/speciality-selector.component';
import { WeekSchedulerComponent } from './components/specialist-profile/week-scheduler/week-scheduler.component';
import { SpecialistFinalizeModalComponent } from './components/specialist-agenda/specialist-finalize-modal/specialist-finalize-modal.component';
import { SpecialistAppointmentModalComponent } from './components/specialist-agenda/specialist-appointment-modal/specialist-appointment-modal.component';
import { SpecialistAppointmentsGridComponent } from './components/specialist-agenda/specialist-appointments-grid/specialist-appointments-grid.component';
import { AppCommonModule } from 'src/app/app-common.module';
import { SpecialistPatientsComponent } from './routes/specialist-patients/specialist-patients.component';


@NgModule({
  declarations: [
    SpecialistPatientsGridComponent,
    SpecialistClinicalRecordsComponent,
    SpecialistPatientsClinicalRecordsComponent,
    SpecialistRecordsModalComponent,
    SpecialistPatientsClinicalRecordsComponent,
    SpecialistRegistrationComponent,
    SpecialistProfileComponent,
    SpecialistAgendaComponent,
    SpecialitySelectorComponent,
    WeekSchedulerComponent,
    SpecialistAppointmentsGridComponent,
    SpecialistAppointmentModalComponent,
    SpecialistFinalizeModalComponent,
    SpecialistPatientsComponent
  ],
  imports: [
    CommonModule,
    SpecialistRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AppCommonModule
  ]
})
export class SpecialistModule { }
