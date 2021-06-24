import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { ClinicalRecord } from 'src/app/models/clinical-record';
import { UserClaims } from 'src/app/models/user-claims';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-agenda',
  templateUrl: './patient-agenda.component.html',
  styleUrls: ['./patient-agenda.component.css']
})
export class PatientAgendaComponent implements OnInit {

  public currentUser?: UserClaims;

  public appointments: Appointment[] = [];

  public clinicalRecords: ClinicalRecord[] = []

  public selectedAppointment?: Appointment;

  public selectedRecord?: ClinicalRecord;


  public modalMode?: string;
  
  public showModal: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private patiService: PatientService,
    private appoService: AppointmentService,
    private crService: ClinicalRecordService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserCredentials();
    this.patiService.getPatientAppointments(this.currentUser!.uid).subscribe({
      next: res => {
        res.map(a => a.date = new Date((<any>a.date).seconds * 1000));
        this.appointments = res;
        console.log(res)

      }
    });

    this.crService.getClinicalRecords().subscribe(res => {
      this.clinicalRecords = res;
      console.log(res)
    })
  }

  trigger(response: any) {
    switch (response.action) {
      case 'cancel':
        this.cancel(response.appointment);
        break;
      case 'review':
        this.review(response.appointment);
        break;
      case 'rate':
        this.rate(response.appointment);
        break;
      case 'survey':
        this.survey(response.appointment);
        break;
      case 'record':
        this.record(response.appointment);
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

  record(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.selectedRecord = this.clinicalRecords.find(cr => cr.appointment.uid === appointment.uid);
    this.modalMode = 'record';
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
