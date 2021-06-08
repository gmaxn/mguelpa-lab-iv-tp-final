import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientProfileComponent } from './routes/patient-profile/patient-profile.component';

const routes: Routes = [
  { path:'profile', component: PatientProfileComponent, data: { animation: 'PatientRegistration' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
