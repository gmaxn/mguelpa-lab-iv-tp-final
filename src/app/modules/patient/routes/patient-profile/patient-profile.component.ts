import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { ClinicalRecord } from 'src/app/models/clinical-record';
import { Patient } from 'src/app/models/patient';
import { ProfileInformation } from 'src/app/models/profile-information';
import { UserClaims } from 'src/app/models/user-claims';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { PdfService } from 'src/app/services/pdf.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  public enabled: boolean = true;

  public speciality: any;

  public user: UserClaims | any;

  public userData: ProfileInformation<Patient> | any;

  public clinicalRecords: any[] = [];

  constructor(
    private auth: AuthenticationService,
    private patiService: PatientService,
    private pdf: PdfService,
    private loadingService: LoadingEventService,
    private appoService: AppointmentService,
    private clinService: ClinicalRecordService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();
    this.patiService.getUserData(this.user!.uid).subscribe(patient => {
      this.userData = patient;
    });

    this.patiService.getClinicalRecordsById(this.user!.uid).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });
      this.clinicalRecords = res;
    });
  }
  getUserSpecialities() {
    return this.user!.roles.filter((r: string) => (r !== 'admin' && r !== 'specialist' && r !== 'patient' && r !== 'user'))
  }
  enableScheduler() {
    this.enabled = true;
  }

  downloadPDF(patient: any) {

    this.loadingService.emitChange(true);
    // this.appoService.getPatientAppointments(patient.uid).subscribe(res => {
    //   res.map(a => {
    //     a.date = new Date((<any>a.date).seconds * 1000);
    //   })
    //   this.generatePDF(res);
    //   this.loadingService.emitChange(false);
    // });

    this.patiService.getClinicalRecordsById(this.user!.uid).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });
      this.generatePDF(res);
      this.loadingService.emitChange(false);

    });
  }
  
  generatePDF(records:ClinicalRecord[]) {
    console.log(records);
    let result:any[]=[];
    records.map(r => {
      const dynamicKeys: string[] = [];
      const dynamicValues: string[] = [];
      r.dynamic.map((obj:any) => {
        dynamicKeys.push(Object.keys(obj)[0]);
        dynamicValues.push(Object.values(<string>obj)[0]);
      })

      let aux = new Date((<any>r.appointment).date * 1000);

      let str = aux.toUTCString();

      result.push(

          { text: `${r.appointment.specialist.firstname} ${r.appointment.specialist.lastname} - ${r.appointment.speciality} - ${str}`, style: 'subheader' },
          {
            style: 'tableExample',
            table: {
              body: [
                ['Altura', 'Peso', 'Temperatura', 'Presión'].concat(dynamicKeys),
                [`${r.height}`, `${r.weight}Kg`, `${r.temperature}`, `${r.pressure}`].concat(dynamicValues)
              ]
            }
          },
          { text: 'Diagnostico:', style: 'subheader' },
          `${r.appointment.diagnosis}`,
          { text: 'Comentarios:', style: 'subheader' },
          `${r.appointment.review}`
 
      );
    });

    this.pdf.generatePDF({
      watermark: { text: 'CLINICA OMED', color: 'blue', opacity: 0.3, bold: true, italics: false,  },
      content: [{ text: `Historial Clínico | ${records[0].appointment.patient.firstname} ${records[0].appointment.patient.lastname}`, style: 'header' }].concat(result)
    });
  }

}