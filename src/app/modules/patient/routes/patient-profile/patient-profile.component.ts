import { HttpClient } from '@angular/common/http';
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
import { PdfMakerService } from 'src/app/utils/pdf-maker.service';
import { PatientService } from '../../services/patient.service';
declare let pdfMake: any ;

import * as pdfMakex from "pdfmake/build/pdfmake";
import * as pdfFontsx from 'pdfmake/build/vfs_fonts';
import { textChangeRangeIsUnchanged } from 'typescript';

(pdfMake as any).vfs = pdfFontsx.pdfMake.vfs;


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  public enabled: boolean = true;

  public speciality: any;

  public specialists: any[] = [];

  public index:number = 0;

  public user: UserClaims | any;

  public userData: ProfileInformation<Patient> | any;

  public clinicalRecords: any[] = [];

  private logo: any;

  private downloaded: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private patiService: PatientService,
    private pdf: PdfService,
    private loadingService: LoadingEventService,
    private appoService: AppointmentService,
    private clinService: ClinicalRecordService,
    private pdfMakerService: PdfMakerService,
    private http: HttpClient
  ) {
    (window as any).pdfMake.vfs = pdfFontsx.pdfMake.vfs;

    // this.pdfMakerService.load('pdfMake', 'vfsFonts');
   }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();
    this.patiService.getUserData(this.user!.uid).subscribe(patient => {
      this.userData = patient;
    });

    this.patiService.getClinicalRecordsById(this.user!.uid).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
        if(this.specialists.filter(s => s.uid === cr.appointment.specialist.uid).length === 0) {
          this.specialists.push(cr.appointment.specialist);
        }
      });
      this.clinicalRecords = res;
    });

    this.http.get('/assets/logo.jpg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.readAsDataURL(res); 
        reader.onloadend = () => {
          var base64data = reader.result;
          this.logo = reader.result as string;
          console.log(this.logo)
        }
      });

  }

  nextSpecialist() {
    if(this.index < this.specialists.length -1) {
      this.index ++;
    }
  }

  previousSpecialist() {
    if(this.index > 0) {
      this.index --;
    }
  }
  getUserSpecialities() {
    return this.user!.roles.filter((r: string) => (r !== 'admin' && r !== 'specialist' && r !== 'patient' && r !== 'user'))
  }
  enableScheduler() {
    this.enabled = true;
  }

  dowloadPDFRecordsBySpecailist(patientId:string, specialistId:string) {
    this.patiService.getClinicalRecordsBySpecialistId(patientId, specialistId).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });
      this.generatePDF(res);
      this.loadingService.emitChange(false);
    });
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
  ////////////////////////////////////////

  generatePdf(action = 'open', patientId:string, specialistId:string) {
    this.downloaded = false;
    this.patiService.getClinicalRecordsBySpecialistId(patientId, specialistId).subscribe(res => {
      res.map(cr => {
        cr.appointment!.date = new Date((<any>cr.appointment.date).seconds * 1000)
      });

      if(!this.downloaded) {
        const documentDefinition = this.getDocumentDefinition(res);
        switch (action) {
          case 'open': 
            pdfMake.createPdf(documentDefinition).open();
            this.downloaded = true;
          break;
          case 'print': pdfMake.createPdf(documentDefinition).print(); break;
          case 'download': 
          let firstname = res[0].appointment.patient.firstname;
          let lastname = res[0].appointment.patient.lastname;
          let now = new Date(Date.now());
          let date = `${now.getDate()}${now.getMonth()+1}${now.getFullYear()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

          pdfMake.createPdf(documentDefinition).download(`historial-clinico-${firstname}-${lastname}-${date}`);
          this.downloaded = true;
          break;
          default: pdfMake.createPdf(documentDefinition).open(); break;
        }
        this.loadingService.emitChange(false);
      }
    });

  }

  getDocumentDefinition(r:ClinicalRecord[]) {
    return {
      content: [
        {
          text: `Historia Clínica | ${r[0].appointment.patient.firstname} ${r[0].appointment.patient.lastname}`,
          bold: true,
          fontSize: 22,
          alignment: 'left',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                text: `Especialista: ${r[0].appointment.specialist.firstname} ${r[0].appointment.specialist.lastname}`,
              },
              {
                text: `Email: ${r[0].appointment.specialist.username}`,
              }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        ...this.getTables(r)
      ],
      info: {
        title: 'this.resume.name' + '_RESUME',
        author: 'this.resume.name',
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            margin: [0, 20, 0, 10]
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 20, 0, 3],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }

  getTables(records: ClinicalRecord[]) {
    let result:any[]=[];
    records.map(r => {
      const dynamicKeys: string[] = [];
      const dynamicValues: string[] = [];
      r.dynamic.map((obj:any) => {
        dynamicKeys.push(Object.keys(obj)[0]);
        dynamicValues.push(Object.values(<string>obj)[0]);
      })

      let aux = new Date((<any>r.appointment).date * 1000);

      let date = `${r.appointment.date.getDay()}/${r.appointment.date.getMonth()}/${r.appointment.date.getFullYear()} ${r.appointment.date.toLocaleTimeString()}`;

      result.push(


          { text: `${r.appointment.speciality.toUpperCase()} | ${date}`, style: 'header' },
          {
            style: 'tableExample',
            table: {
              body: [
                ['Altura', 'Peso', 'Temperatura', 'Presión'].concat(dynamicKeys),
                [`${r.height}mts`, `${r.weight}Kg`, `${r.temperature}c`, `${r.pressure}`].concat(dynamicValues)
              ]
            }
          },
          { text: 'Diagnostico:', style: 'subheader' },
          `${r.appointment.diagnosis}`,
          { text: 'Comentarios:', style: 'subheader' },
          `${r.appointment.review}`
 
      );
    });

    return result;
  }

  getProfilePicObject() {
    if (this.logo) {
      return {
        image: this.logo ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e: any) {
    const file = e.target.files[0];
    console.log(file);
    this.getBase64(file);
  }

  getBase64(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.logo = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

}