import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialistPatientsClinicalRecordsComponent } from './components/specialist-clinical-records/specialist-patients-clinical-records/specialist-patients-clinical-records.component';
import { SpecialistRecordsModalComponent } from './components/specialist-clinical-records/specialist-records-modal/specialist-records-modal.component';
import { SpecialistClinicalRecordsComponent } from './routes/specialist-clinical-records/specialist-clinical-records.component';
import { SpecialistPatientsGridComponent } from './components/specialist-clinical-records/specialist-patients-grid/specialist-patients-grid.component';


@NgModule({
  declarations: [
    SpecialistPatientsGridComponent,
    SpecialistClinicalRecordsComponent,
    SpecialistPatientsClinicalRecordsComponent,
    SpecialistRecordsModalComponent,
    SpecialistPatientsClinicalRecordsComponent
  ],
  imports: [
    CommonModule,
    SpecialistRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SpecialistModule { }
