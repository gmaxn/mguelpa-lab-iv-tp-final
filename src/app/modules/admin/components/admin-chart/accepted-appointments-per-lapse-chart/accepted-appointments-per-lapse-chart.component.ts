import { Component, OnInit, ɵConsole } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { SpecialistService } from 'src/app/modules/specialist/services/specialst.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet, MultiLineLabel, SingleDataSet } from 'ng2-charts';
import { SpecialityService } from 'src/app/services/speciality.service';
@Component({
  selector: 'app-accepted-appointments-per-lapse-chart',
  templateUrl: './accepted-appointments-per-lapse-chart.component.html',
  styleUrls: ['./accepted-appointments-per-lapse-chart.component.css']
})
export class AcceptedAppointmentsPerLapseChartComponent implements OnInit {

  public min: Date | any;

  public max: Date | any;

  public specialists: any[] = [];

  public specialist: any = null;

  public index: number = 0;

  public appointments: any[] = [];

  public groups: any[] = [];

  private url_base64:any;

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
    { data: [], label: '' }
  ];

  constructor(
    private specService: SpecialistService,
    private appoService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.specService.getAllSpecialists().subscribe(spec => {
      this.specialists = spec;
      this.specialist = this.specialists[0];
      console.log(this.specialist);
    })
  }

  nextSpecialist() {
    if (this.index < this.specialists.length - 1) {
      this.index++;
      this.specialist = this.specialists[this.index];
      this.onChange()
    }
  }

  previousSpecialist() {
    if (this.index > 0) {
      this.index--;
      this.specialist = this.specialists[this.index];
      this.onChange()
    }
  }

  onChange() {
    this.appointments = [];
    this.groups = [];
    this.barChartLabels = [];
    this.barChartData = [];

    if (this.specialist && this.min && this.max) {

      this.appoService.getAllDateDesc().subscribe(app => {


        app.map(a => {
          a.date = new Date((<any>a.date).seconds * 1000)
        });

        this.appointments = app.filter(a => a.patient);



        this.appointments.map(a => {
          a.date.setHours(0, 0, 0, 0);

          let min = new Date(this.min);
          min.setHours(0, 0, 0, 0);

          let max = new Date(this.max);
          max.setHours(0, 0, 0, 0);

          if(a.date > min && a.date < max) {
            let g =this.groups.find(g => g.specialist?.uid === a.specialist.uid)
            if(g) {
              g.count = g.count +1
            } else {
              this.groups.push({
                specialist: a.specialist,
                count: 1
              })
            }
          }

        })


        this.groups.map(g => {
          this.barChartLabels.push(<MultiLineLabel><unknown>`${g.specialist.firstname} ${g.specialist.lastname}`);
        })
        let dataSets = [
          {
            data: this.groups.map(g => g.count)
          }
        ]
        this.barChartData = dataSets;
        
        
      })
    }

    
  }

}