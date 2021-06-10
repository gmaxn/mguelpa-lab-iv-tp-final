import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAgendaComponent } from './routes/patient-agenda/patient-agenda.component';
import { PatientEnrollmentComponent } from './routes/patient-enrollment/patient-enrollment.component';
import { PatientProfileComponent } from './routes/patient-profile/patient-profile.component';

const routes: Routes = [
  { path:'profile', component: PatientProfileComponent, data: { animation: 'PatientRegistration' } },
  { path:'enrollment', component: PatientEnrollmentComponent, data: { animation: 'PatientRegistration' } },
  { path:'agenda', component: PatientAgendaComponent, data: { animation: 'PatientRegistration' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
