import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet, MultiLineLabel, SingleDataSet } from 'ng2-charts';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';

@Component({
  selector: 'app-appointments-per-day-chart2',
  templateUrl: './appointments-per-day-chart2.component.html',
  styleUrls: ['./appointments-per-day-chart2.component.css']
})
export class AppointmentsPerDayChart2Component implements OnInit {

  private minDate: Date = new Date(Date.now());
  private maxDate: Date = new Date(Date.now());

  public timeline: Date[] = [];


  private appointments: Appointment[] = [];

  private specialists: any[] = [];

  private groupByDate: any[] = [];

  @Output() canvas2: EventEmitter<string> = new EventEmitter<string>();

  lineChartData: ChartDataSets[] = [/*
    { data: [85, 72, 78, 75, 77, 75], label: 'Hernando Hernandez' },
    { data: [85, 32, 95, 4, 34, 16], label: 'Gimena Gimenez' },
    { data: [69, 12, 36, 45, 36, 74], label: 'Jane Watson' },*/
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [/*
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },*/
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';


  constructor(
    private appoService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.appoService.getAllDateDesc().subscribe(res => {
      // 1 obtengo fecha minima y maxima y turnos
      res.map(a => {
        a.date = new Date((<any>a.date).seconds * 1000);

        if (a.patient) {
          if (a.date > this.maxDate) {
            this.maxDate = a.date;
            this.maxDate.setHours(0, 0, 0, 0);
          }
          if (a.date < this.minDate) {
            this.minDate = a.date;
            this.minDate.setHours(0, 0, 0, 0);
          }
          if(!this.specialists.find(s => s.uid === a.specialist.uid)) {
            this.specialists.push(a.specialist)
          }
          this.appointments.push(a)
        }
      });
      // 2 desde la fecha minima tomo un appointment con el mismo dia
      const oneDay = 24 * 60 * 60 * 1000;
      let timeDiff = this.maxDate.getTime() - this.minDate.getTime();
      let dayDiff = Math.round(Math.abs((timeDiff / (oneDay))));
      for (let i = this.minDate.getTime(); i <= this.maxDate.getTime(); i = (i + oneDay)) {
        this.specialists.map(s => {
          this.groupByDate.push({
            date: new Date(i),
            specialist: s,
            appointmentCount: 0
          });
        })
        const date = new Date(i);
        let appointments = this.appointments.filter(a => a.date.getDate() === date.getDate() && a.date.getMonth() === date.getMonth() && a.date.getFullYear() === date.getFullYear());
        appointments.map(x => {
          let group = this.groupByDate.find(g => g.date.getDate() === x.date.getDate() && g.date.getMonth() === x.date.getMonth() && g.date.getFullYear() === x.date.getFullYear() && g.specialist?.uid === x.specialist?.uid);
          if(!group) {
            this.groupByDate.push({
              date: x.date,
              specialist: x.specialist,
              appointmentCount: 1
            });
          }
          if(group) {
            group.appointmentCount = group.appointmentCount +1;
          }
        })
      }
      let values: string[] = [];
      this.groupByDate.map(g => {
        if(!values.includes(`${g.date.getDate()}-${g.date.getMonth()}-${g.date.getFullYear()}`)) {
          values.push(`${g.date.getDate()}-${g.date.getMonth()}-${g.date.getFullYear()}`)
        }
      })
      this.lineChartLabels = [...values];
      this.lineChartData = [];
      this.specialists.map(s => {
        this.lineChartData.push({
          data: this.groupByDate.filter(g => g.specialist.uid === s.uid).map(g => g.appointmentCount),
          label: `${s.firstname} ${s.lastname}`
        })
      })
    })
  }


}
