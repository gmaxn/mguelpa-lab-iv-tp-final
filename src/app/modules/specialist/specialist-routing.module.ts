import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistAgendaComponent } from './routes/specialist-agenda/specialist-agenda.component';
import { SpecialistClinicalRecordsComponent } from './routes/specialist-clinical-records/specialist-clinical-records.component';
import { SpecialistPatientsComponent } from './routes/specialist-patients/specialist-patients.component';
import { SpecialistProfileComponent } from './routes/specialist-profile/specialist-profile.component';
import { SpecialistRegistrationComponent } from './routes/specialist-registration/specialist-registration.component';

const routes: Routes = [
  { path: 'clinical-records', component: SpecialistClinicalRecordsComponent },
  { path: 'enrollment', component: SpecialistRegistrationComponent, data: { animation: 'SpecialistRegistration' }  },
  { path: 'profile', component: SpecialistProfileComponent },
  { path: 'agenda', component: SpecialistAgendaComponent },
  { path: 'patients', component: SpecialistPatientsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistRoutingModule { }
