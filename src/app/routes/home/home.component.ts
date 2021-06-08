import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public appointments: Appointment[] = [];

  constructor(
    private appoService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.appoService.getAll().subscribe(res => {
      this.appointments = res;
      console.log(res);
    })
  }

}
