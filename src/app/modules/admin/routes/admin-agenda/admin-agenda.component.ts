import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { UserClaims } from 'src/app/models/user-claims';
import { PatientService } from 'src/app/modules/patient/services/patient.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-agenda',
  templateUrl: './admin-agenda.component.html',
  styleUrls: ['./admin-agenda.component.css']
})
export class AdminAgendaComponent implements OnInit {

  public currentUser?: UserClaims;

  public appointments: Appointment[] = [];

  public selectedAppointment?: Appointment;

  public modalMode?: string;
  
  public showModal: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private patiService: PatientService,
    private appoService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserCredentials();
    this.appoService.getAll().subscribe({
      next: res => {
        res.map(a => a.date = new Date((<any>a.date).seconds * 1000));
        this.appointments = res;
      }
    });
  }

  trigger(response: any) {
    switch (response.action) {
      case 'cancel':
        this.cancel(response.appointment);
        break;
      case 'review':
        this.review(response.appointment);
        break;
    }
  }

  cancel(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'cancel';
    this.showModal = true;
  }

  review(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'review';
    this.showModal = true;
  }

  rate(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'rate';
    this.showModal = true;
  }

  survey(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'survey';
    this.showModal = true;
  }

  onModalResponse(response:any) {
    switch(response.from) {

      case 'rate':
        if(response.succeed) {
          this.selectedAppointment!.rating = response.data;
          this.appoService.updateAppointment(this.selectedAppointment!);
        }
        this.showModal = false;
      break;

      case 'survey':
        this.showModal = false;
      break;

      case 'cancel':
        if(response.succeed) {
          this.selectedAppointment!.status = 'cancelled';
          this.selectedAppointment!.review = response.data;
          this.appoService.updateAppointment(this.selectedAppointment!);
        }
        this.showModal = false;
      break;

      case 'review':
        this.showModal = false;
      break;
    }
  }
}