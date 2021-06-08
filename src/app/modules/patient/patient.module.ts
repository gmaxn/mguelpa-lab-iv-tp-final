import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientProfileComponent } from './routes/patient-profile/patient-profile.component';
import { PatientClinicalRecordsGridComponent } from './components/patient-profile/patient-clinical-records-grid/patient-clinical-records-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientProfileComponent,
    PatientClinicalRecordsGridComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class PatientModule { }
