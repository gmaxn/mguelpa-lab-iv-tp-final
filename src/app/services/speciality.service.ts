import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Speciality } from '../models/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getSpecialities() {
    return this.firestore.collection<Speciality>('specialities').valueChanges().pipe(
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
