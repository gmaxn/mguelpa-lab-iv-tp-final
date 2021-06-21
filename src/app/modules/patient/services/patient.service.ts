import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { BlobFile } from 'src/app/models/blob-flile';
import { ClinicalRecord } from 'src/app/models/clinical-record';
import { Patient } from 'src/app/models/patient';
import { ProfileInformation } from 'src/app/models/profile-information';
import { UserCredentials } from 'src/app/models/user-credentials';
import { UserRegistrationData } from 'src/app/models/user-registration-data';
import { BlobStorageService } from './blob-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private blob: BlobStorageService
  ) { }

  public getClinicalRecordsById(patientId:string) {
    return this.db.collection<ClinicalRecord>('/clinical-records', ref =>
      ref.where('appointment.patient.uid', '==', patientId)
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public getClinicalRecordsBySpecialistId(patientId:string, specialistId: string) {
    return this.db.collection<ClinicalRecord>('/clinical-records', ref =>
      ref.where('appointment.patient.uid', '==', patientId).where('appointment.specialist.uid', '==', specialistId)
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public getUserData(uid:string) {
    return this.db.collection<any>("users")
    .doc(uid)
    .valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public getPatientAppointments(patientId: string) {
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('patient.uid', '==', patientId).where('isTaken', '==', true).orderBy("date", "asc")
      ).valueChanges().pipe(
        catchError(this.handleError)
      );
  }

  public getAppointments(patientId: string) {
    return this.db.collection<Appointment>('/appointments', ref => ref.where('patient.uid', '==', patientId))
    .valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public getAllAppointments() {
    return this.db.collection<Appointment>('/appointments', ref => ref.orderBy("date", "asc")
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  // public deleteAppointment(patientId: string, appointmentId: string, reazon: string) {
  //   return this.db.collection<any>("users").doc(patientId).collection('appointments').doc(appointmentId).update({ isCancelled: reazon, status: "Cancelado" });
  // }

  public registerPatient(registrationData: UserRegistrationData<Patient>, pictures: BlobFile[]) {
    return new Promise<string>((resolve, reject) => {
      this.createUserWithEmailAndPassword(registrationData.credentials).then(response => {
        registrationData.profile.claims.uid = response.user!.uid;
        const pics = this.setFileName(registrationData.profile.claims.uid, pictures);
        this.uploadProfilePictures(pics).then(imageUrls => {
          registrationData.profile.claims.photoUrls = imageUrls;
          this.uploadProfile(registrationData.profile);
          resolve(response.user!.uid);
        });
      });
    });
  }

  private createUserWithEmailAndPassword(credentials: UserCredentials) {
    return this.auth.createUserWithEmailAndPassword(credentials.username, credentials.password);
  }
  private setFileName(uid: string, pictures: BlobFile[]) : BlobFile[] {
    let i = 0;
    pictures.map(p => {
      p.filename = `users/${uid}_${Date.now()}_${i}.jpeg`;
      i++;
    });
    return pictures;
  }
  private uploadProfilePictures(pictures: BlobFile[]) {
    return this.blob.uploadFiles(pictures);
  }
  private uploadProfile(profile: ProfileInformation<Patient>) {
    const docRef = this.db.collection("users").doc(profile.claims.uid);
    return docRef.set(profile).then(
      res => {
        console.log(res);
      },
      err => this.handleError(err)
    )
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