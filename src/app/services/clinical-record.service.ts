import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { ClinicalRecord } from '../models/clinical-record';

@Injectable({
  providedIn: 'root'
})
export class ClinicalRecordService {

  constructor(
    private db: AngularFirestore
  ) { }

  public getClinicalRecords() {
    return this.db.collection<ClinicalRecord>('/clinical-records', ref =>
      ref.orderBy("date", "asc")
      ).valueChanges().pipe(
        catchError(this.handleError)
      );
  }

  public getClinicalRecordsByPatientId(patientId:string) {
    const ref = this.db.collection("clinical-records");
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('patient.uid', '==', patientId)
    ).valueChanges().pipe(
      catchError(this.handleError)
    );
  }
  async addClinicalRecord(clinicalRecord: any) {

    return this.db.collection("clinical-records").add(clinicalRecord).then(
      res => {
        let ref = this.db.collection('clinical-records').doc(res.id);
        ref.update({ uid: res.id });
      },
      err => this.handleError(err)
    ).finally();
  }


  public async updateClinicalRecord(clinicalRecord: any) {
    return this.db.collection<any>("clinical-record").doc(clinicalRecord.uid)
                   .set(clinicalRecord).then(ok => { }, err => { this.handleError(err) });
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
