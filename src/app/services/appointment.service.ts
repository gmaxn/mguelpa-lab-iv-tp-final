import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private db: AngularFirestore
  ) { }


  public getAll() {
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('status', '!=', 'available').orderBy('status', 'asc').orderBy('date', 'asc')
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public async updateAppointment(appointment: Appointment) {

    const docRef = this.db.collection<Appointment>("appointments").doc(appointment.uid);

    return docRef.update(appointment)
                 .then(ok => { }, err => { this.handleError(err) });
  }

  public getSpecialistAppointments(specialistId: string) {
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('specialist.uid', '==', specialistId)
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public getPatientAppointments(patientId: string) {
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('patient.uid', '==', patientId)
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public delteAppointment(uid: string) {
    return this.db.collection("appointments").doc(uid).delete();
  }


  async addAvailability(appointment: Appointment) {
    return this.db.collection("appointments").add(appointment).then(
      res => {
        let ref = this.db.collection('appointments').doc(res.id);
        ref.update({ uid: res.id });
      },
      err => this.handleError(err)
    ).finally();
  }

  async takeAppointment(appointment: Appointment) {
    return this.db.collection("appointments")
    .doc(appointment.uid).update(appointment);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}