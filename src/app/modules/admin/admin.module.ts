import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAgendaComponent } from './routes/admin-agenda/admin-agenda.component';
import { AdminAppointmentModalComponent } from './components/admin-agenda/admin-appointment-modal/admin-appointment-modal.component';
import { AdminAppointmentsGridComponent } from './components/admin-agenda/admin-appointments-grid/admin-appointments-grid.component';
import { FormsModule } from '@angular/forms';
import { AdminUserManagementComponent } from './routes/admin-user-management/admin-user-management.component';
import { AppCommonModule } from 'src/app/app-common.module';
import { AdminUserManagerComponent } from './components/admin-user-management/admin-user-manager/admin-user-manager.component';
import { AdminClinicalRecordsComponent } from './routes/admin-clinical-records/admin-clinical-records.component';
import { AdminPatientsGridComponent } from './components/admin-clinical-records/admin-patients-grid/admin-patients-grid.component';
import { AdminRecordsModalComponent } from './components/admin-clinical-records/admin-records-modal/admin-records-modal.component';
import { AdminPatientClinicalRecordsComponent } from './components/admin-clinical-records/admin-patient-clinical-records/admin-patient-clinical-records.component';
import { AdminPatientGridComponent } from './components/admin-patient-grid/admin-patient-grid.component';
import { AdminChartComponent } from './routes/admin-chart/admin-chart.component';
import { LogsGridComponent } from './components/admin-chart/logs-grid/logs-grid.component';
import { SpecialitiesChartComponent } from './components/admin-chart/specialities-chart/specialities-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AdminAgendaComponent,
    AdminAppointmentModalComponent,
    AdminAppointmentsGridComponent,
    AdminUserManagementComponent,
    AdminUserManagerComponent,
    AdminClinicalRecordsComponent,
    AdminPatientsGridComponent,
    AdminRecordsModalComponent,
    AdminPatientClinicalRecordsComponent,
    AdminPatientGridComponent,
    AdminChartComponent,
    LogsGridComponent,
    SpecialitiesChartComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class AdminModule { }
