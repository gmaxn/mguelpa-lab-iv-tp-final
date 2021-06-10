import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentRequestComponent } from './routes/appointment-request/appointment-request.component';
import { EnrollmentComponent } from './routes/enrollment/enrollment.component';
import { HomeComponent } from './routes/home/home.component';
import { SigninComponent } from './routes/signin/signin.component';
import { UserGuardService } from './services/user-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, data: { animation: 'EnrollmentPage' } },
  { path: 'signin', component: SigninComponent },
  { path: 'appointments', component: AppointmentRequestComponent, data: { animation: 'SpecialistRegistration' }, canActivate: [UserGuardService] },

  { path: 'enrollment', component: EnrollmentComponent, data: { animation: 'EnrollmentPage' } },
  { path: 'patient', loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'specialist', loadChildren: () => import('./modules/specialist/specialist.module').then(m => m.SpecialistModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
