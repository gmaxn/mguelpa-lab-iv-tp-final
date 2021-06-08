import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Appointment } from 'src/app/models/appointment';
import { BlobStorageService } from '../../patient/services/blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialstService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private router: Router
  ) { }


  public getSpecialistAppointments(specialistId: string) {
    return this.db.collection<Appointment>('/appointments', ref =>
      ref.where('specialist.uid', '==', specialistId).where('isTaken', '==', true).orderBy("date", "asc")
      ).valueChanges().pipe(
        catchError(this.handleError)
      );
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
