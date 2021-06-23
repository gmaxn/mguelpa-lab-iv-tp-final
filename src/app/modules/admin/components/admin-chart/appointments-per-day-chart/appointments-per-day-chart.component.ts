import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet, MultiLineLabel, SingleDataSet } from 'ng2-charts';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';

@Component({
  selector: 'app-appointments-per-day-chart',
  templateUrl: './appointments-per-day-chart.component.html',
  styleUrls: ['./appointments-per-day-chart.component.css']
})
export class AppointmentsPerDayChartComponent implements OnInit {

  public date: any;

  public dates:any[] = [];

  public gorups: any[] = [];

  public index: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0
          }
        }
      ]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: ''}
  ];

  public appointments: any[] = [];

  constructor(
    private specialities: SpecialityService,
    private appoService: AppointmentService
  ) { }

  ngOnInit() {
    this.appoService.getAllDateDesc().subscribe(app => {
      this.appointments = app.filter(a => a.patient !== null);
      this.appointments.map(a => {
        a.date = new Date((<any>a.date).seconds * 1000)


      });
      
      this.appointments.map(a => {
        if(!this.dates.find(d => `${a.date.getDate()}-${a.date.getMonth()}-${a.date.getFullYear()}` === `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`)) {
          this.dates.push(a.date);
        }
        let group = this.gorups.find((g: any) => g.speciality === a.speciality);

        if (group) {
          group.count = group.count + 1;
        } else {
          this.gorups.push({
            speciality: a.speciality,
            count: 1
          })
        }

      });
      this.onDatePicker('default');
    })

  }

  onDatePicker(direction:string = 'default') {

    if(direction === 'next' && this.index < this.dates.length-1) {
      this.index++;
      this.date = this.dates[this.index];
    }

    if(direction === 'prev' && this.index > 0) {
      this.index--;
      this.date = this.dates[this.index];
    }

    if(direction === 'default') {
      this.date = this.dates[0];
    }



    this.gorups = [];

    this.barChartLabels = [];

    this.barChartPlugins = [];

    this.appointments.map(a => {

      let date = new Date(this.date);

      let day = date.getDay();
      let month = date.getMonth();
      let year = date.getFullYear();

      if (a.date.getDay() === day && a.date.getMonth() === month && a.date.getFullYear() === year) {

        let group = this.gorups.find((g: any) => g.speciality === a.speciality);

        if (group) {
          group.count = group.count + 1;
        } else {
          this.gorups.push({
            speciality: a.speciality,
            count: 1
          })
        }
      }
    });
    this.gorups.map(g => {
      this.barChartLabels.push(<MultiLineLabel><unknown>g.speciality);
    })
    let dataSets = [
      {
        data: this.gorups.map(g => g.count)
      }
    ]
    this.barChartData = dataSets;
  }
}