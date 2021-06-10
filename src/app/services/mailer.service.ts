import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  private url = 'https://mguelpa-lab-iv-tp-clinica.herokuapp.com/mailer';
  private countriesUrl = 'https://restcountries.eu/rest/v2';


  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countriesUrl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  sendMessage(body:any) {
    return this.http.post(this.url, body).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  sendMessage2(body:any) {
    return this.http.post(this.url, body);
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
