import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { UserClaims } from 'src/app/models/user-claims';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';
import { SpecialistService } from '../../services/specialst.service';
@Component({
  selector: 'app-specialist-agenda',
  templateUrl: './specialist-agenda.component.html',
  styleUrls: ['./specialist-agenda.component.css']
})
export class SpecialistAgendaComponent implements OnInit {

  public currentUser?: UserClaims;

  public appointments: Appointment[] = [];

  public selectedAppointment?: Appointment;

  public modalMode?: string;
  
  public showModal: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private specService: SpecialistService,
    private appoService: AppointmentService,
    private clinService: ClinicalRecordService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserCredentials();
    this.specService.getSpecialistAppointments(this.currentUser!.uid).subscribe({
      next: res => {
        res.map(a => a.date = new Date((<any>a.date).seconds * 1000));
        this.appointments = res;
      }
    });
  }

  trigger(response: any) {
    switch (response.action) {
      case 'accept':
        this.accept(response.appointment);
        break;
      case 'reject':
        this.reject(response.appointment);
        break;
      case 'finalize':
        this.finalize(response.appointment);
        break;
      case 'cancel':
        this.cancel(response.appointment);
        break;
      case 'review':
        this.review(response.appointment);
        break;
    }
  }

  accept(appointment: Appointment) {
    if(appointment.status === 'taken') {
      appointment.status = 'accepted';
      this.appoService.updateAppointment(appointment);
    }
  }

  reject(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'reject';
    this.showModal = true;
  }

  finalize(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.modalMode = 'finalize';
    this.showModal = true;
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

  onModalResponse(response:any) {
    switch(response.from) {
      case 'reject':
        if(response.succeed) {
          this.selectedAppointment!.status = 'rejected';
          this.selectedAppointment!.review = response.data;
          this.appoService.updateAppointment(this.selectedAppointment!);
        }
        this.showModal = false;
      break;
      case 'finalize':
        if(response.succeed) {
          this.selectedAppointment!.status = 'finalized';
          this.selectedAppointment!.review = response.data.comments;
          this.selectedAppointment!.diagnosis = response.data.diagnosis;
          const clinicalRecord = {
            uid: '',
            appointment: this.selectedAppointment,
            height: response.data.clinicalRecord.height,
            weight: response.data.clinicalRecord.weight,
            temperature: response.data.clinicalRecord.temperature,
            pressure: response.data.clinicalRecord.pressure,
            dynamic: response.data.clinicalRecord.dynamic
          };

          this.clinService.addClinicalRecord(clinicalRecord);
          this.appoService.updateAppointment(this.selectedAppointment!);
        }
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