import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment, DatePicker } from 'src/app/models/appointment';
import { UserClaims } from 'src/app/models/user-claims';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-appointment-selector',
  templateUrl: './appointment-selector.component.html',
  styleUrls: ['./appointment-selector.component.css']
})
export class AppointmentSelectorComponent implements OnInit {

  public months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public days: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  public hours: string[] = ['08:00hs', '09:00hs', '10:00hs', '11:00hs', '12:00hs', '13:00hs', '14:00hs', '15:00hs', '16:00hs', '17:00hs', '18:00hs', '19:00hs'];

  public week: Date[] = [];

  private datePicker = new DatePicker();

  public appointments: Array<Array<Appointment>> = new Array<Array<Appointment>>();

  private pageNumber: number = 0;

  private get page(): number {
    return this.pageNumber;
  }

  private currentUser?: UserClaims;

  public dbAppointments: Appointment[] = [];

  @Input() public selectedSpecialist?: UserClaims;

  @Input() speciality: string = '';

  public selectedAppointment: Appointment | any;

  public showModal: boolean = false;

  constructor(
    private ap: AppointmentService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUserCredentials();
    this.ap.getSpecialistAppointments(this.selectedSpecialist!.uid).subscribe({
      next: response => {
        response.map(a => a.date = new Date((<any>a.date).seconds * 1000));
        this.dbAppointments = response;
        this.week = this.datePicker.goto(this.page);
        this.merge(response, this.week);
      },
      error: err => console.log(err)
    });
  }

  merge(dbAppointments: Appointment[], week: Date[]) {
    week.map((day, i, arr) => {
      this.appointments[i] = [];
      this.hours.map((hour, j, arr) => {
        day.setHours(j + 8, 0, 0);
        let appointment = dbAppointments.filter(a => a.date.toUTCString() === day.toUTCString())[0];
        if (appointment) {
          this.appointments[i][j] = appointment;
        }
        else {
          let date = new Date(week[i]);
          date.setHours(j + 8, 0, 0);
          this.appointments[i][j] = {
            uid: '',
            date: date,
            isActive: true,
            isTaken: false,
            patient: null,
            specialist: null,
            isCancelled: false,
            status: '',
            speciality: '',
            review: null,
            diagnosis: '',
            survey: null
          }
        }
      });
    });
  }

  nextWeek() {
    this.pageNumber++;
    this.week = this.datePicker.goto(this.page);
    this.merge(this.dbAppointments, this.week);
  }

  previousWeek() {
    if (this.week[0] > this.datePicker.currentWeek[0]) {
      this.pageNumber--;
      this.week = this.datePicker.goto(this.page);
      this.merge(this.dbAppointments, this.week);
    }
  }

  getDay(day: Appointment[]): string {
    return this.days[day[0].date.getDay()];
  }

  getHours(day: Date) {
    let hours: Date[] = [];
    for (let i = 8; i < 20; i++) {
      let hour: Date = new Date(day);
      hour.setHours(i, 0, 0);
      hours.push(hour);
    }
    return hours;
  }

  getDate(day: Appointment[]): number {
    return day[0].date.getDate();
  }

  getMonth() {
    return this.months[this.week[0]?.getMonth()];
  }

  getClass(appointment: Appointment) {


    let classes: string[] = [];

    const now = new Date(Date.now());

    if(appointment.isTaken && appointment.patient !== this.currentUser) {
      classes.push('not-available');

    }

    if(appointment.status === 'available') {
      classes.push('available');
    }

    if(appointment.speciality !== this.speciality

      ) {
      classes.push('not-available');
    }


    // if (appointment.status === 'available' && appointment.speciality === this.speciality) {
    //   classes.push('available');
    // }

    // if (appointment.patient && this.speciality === appointment.speciality) {
    //   classes.push('taken');
    // }

    // if (appointment.status === 'available' || appointment.patient && appointment.speciality !== this.speciality) {
    //   classes.push('expired');
    // }

    // if (appointment.date < now) {
    //   classes.push('not-available');
    // }

    if (appointment.date.getDay() === 6) {
      let day = (new Date(appointment.date));
      day.setHours(14, 0, 0)
      if (appointment.date > day) {
        classes.push('not-available');
      }
    }

    return classes.join(' ');
  }

  isCurrentDay(day: Appointment[]): boolean {
    const now = new Date(Date.now());
    return day[0].date.toDateString() == now.toDateString();
  }

  onSelection(day: Appointment) {
    const classList = document.getElementById(`pill_${day.date.getTime()}`)?.classList;

    if (classList?.contains('available') && !day.isTaken) {
      day.status = 'taken';
      day.isTaken = true;
      day.patient = this.currentUser;
      this.selectedAppointment = day;
      this.showModal = true;
    }

    // if (!classList?.contains('available') && !classList?.contains('taken') && !classList?.contains('expired')) {
    //   day.speciality = this.speciality;
    //   day.specialist = this.currentUser;
    //   day.status = 'available';
    //   this.ap.addAvailability(day);
    // }
  }

  // onSelection(day: Date, hour: number) {
  //   day.setHours(hour, 0, 0);

  //   const dateTime = `${day.toLocaleDateString()} ${day.toLocaleTimeString()}`;

  //   if (!(day > new Date(Date.now())))
  //     return;

  //   const appointment = this.appointments.filter(a=> `${a.date.toLocaleDateString()} ${a.date.toLocaleTimeString()}` === dateTime)[0];

  //   if(appointment.isTaken)
  //     return;

  //     this.selectedAppointment = appointment;

  //     this.showModal = true;
  // }

  getFullDateString(day: Date, hour: number) {
    day.setHours(hour, 0, 0);
    return `${day.toLocaleDateString()} ${day.toLocaleTimeString()}`;
  }

  // isEnabled(day: Date, hour: number) {
  //   day.setHours(hour, 0, 0);
  //   const dateTime = `${day.toLocaleDateString()} ${day.toLocaleTimeString()}`;
  //   if (!(day > new Date(Date.now())))
  //     return false;

  //   const appointment = this.appointments.filter(a=> `${a.date.toLocaleDateString()} ${a.date.toLocaleTimeString()}` === dateTime && a.speciality === this.speciality)[0];
  //   if(appointment && !appointment.isTaken)
  //     return true;

  //   return false;
  // }

  // enablePill(date:Date, hour:number) {
  //   date.setHours(hour, 0, 0, 0);
  //   const result = this.appointments.filter(a => a.date.getTime() === date.getTime());
  //   return result.length === 1;
  // }

  onModalResponse(response: any) {
    this.showModal = false;
    if (response.data === 'ok') {
      this.selectedAppointment.patient = this.currentUser;
      this.ap.takeAppointment(this.selectedAppointment);
      this.router.navigate(['patient/appointments'])
    }
  }
}