import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { UserClaims } from 'src/app/models/user-claims';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CsvService } from 'src/app/services/csv.service';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { PdfService } from 'src/app/services/pdf.service';
import { RouteNameEventService } from 'src/app/services/route-name-event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  public logged = false;

  public user: UserClaims | any = null;

  public hasRoleAdmin: boolean = false;

  public mode = '';

  public users: any[] = [];

  public patients: any[] = [];

  public specialist: any[] = [];

  public admin: any[] = [];

  constructor(
    private auth: AuthenticationService,
    private routeName: RouteNameEventService,
    private userService: UserService,
    private csv: CsvService,
    private appoService: AppointmentService,
    private loadingService: LoadingEventService,
    private pdf: PdfService
  ) { }

  ngOnInit(): void {

    this.user = (JSON.parse(localStorage.getItem('userCredentials')!));

    if (this.user) {
      this.logged = true;
    } else {
      this.user = null;
    }

    this.auth.logged$.subscribe(loggedin => {
      if (loggedin) {
        this.user = <UserClaims>(JSON.parse(localStorage.getItem('userCredentials')!));
        this.hasRoleAdmin = this.user.roles.includes('admin');
        this.logged = true;
      } else {
        this.logged = false;
        this.user = null;
      }
    })

    this.routeName.changeEmitted$.subscribe(
      value => {
        this.mode = value;
      });


      this.userService.getAllUsers().subscribe(res => {
        this.users = res;
        this.patients = res.filter(p => p.claims.roles.includes('patient'));
        this.specialist = res.filter(p => p.claims.roles.includes('specialist'));
        this.admin = res.filter(p => p.claims.roles.includes('admin'));
      });

  }


  downloadCSV(patientId: string) {

    this.loadingService.emitChange(true);
    this.appoService.getPatientAppointments(patientId).subscribe(res => {
      res.map(a => {
        a.date = new Date((<any>a.date).seconds * 1000);
      })
      this.generateCSV(res);
      this.loadingService.emitChange(false);
    });
  }

  downloadPDF(patientId: string) {

    this.loadingService.emitChange(true);
    this.appoService.getPatientAppointments(patientId).subscribe(res => {
      res.map(a => {
        a.date = new Date((<any>a.date).seconds * 1000);
      })
      this.generatePDF(res);
      this.loadingService.emitChange(false);
    });
  }

  generatePDF(appointments:Appointment[]) {
    let result:any[]=[];
    appointments.map(a => {
      result.push({
        fecha: a.date.toUTCString(),
        paciente: `${a.patient.firstname} ${a.patient.firstname}`,
        especialista: `${a.specialist.firstname} ${a.specialist.lastname}`,
        status: a.status
      });
    });
    this.pdf.generatePDF(result);
  }

  generateCSV(appointments:Appointment[]) {
    let result:any[]=[];
    appointments.map(a => {
      result.push({
        fecha: a.date.toUTCString(),
        paciente: `${a.patient.firstname} ${a.patient.firstname}`,
        especialista: `${a.specialist.firstname} ${a.specialist.lastname}`,
        status: a.status
      });
    });
    this.csv.exportAsExcelFile(result, 'turnos-clinica-omed');
  }
}
