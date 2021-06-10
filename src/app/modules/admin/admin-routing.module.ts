import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAgendaComponent } from './routes/admin-agenda/admin-agenda.component';
import { AdminClinicalRecordsComponent } from './routes/admin-clinical-records/admin-clinical-records.component';
import { AdminUserManagementComponent } from './routes/admin-user-management/admin-user-management.component';

const routes: Routes = [
  { path:'agenda', component: AdminAgendaComponent },
  { path:'management', component: AdminUserManagementComponent },
  { path:'clinical-records', component: AdminClinicalRecordsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
