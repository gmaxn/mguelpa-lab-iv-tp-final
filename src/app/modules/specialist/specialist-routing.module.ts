import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistClinicalRecordsComponent } from './routes/specialist-clinical-records/specialist-clinical-records.component';

const routes: Routes = [
  { path: 'clinical-records', component: SpecialistClinicalRecordsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
