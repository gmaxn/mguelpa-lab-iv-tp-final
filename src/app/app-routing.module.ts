import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'patient', loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'specialist', loadChildren: () => import('./modules/specialist/specialist.module').then(m => m.SpecialistModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
