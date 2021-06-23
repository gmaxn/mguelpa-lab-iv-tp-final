import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, MultiDataSet, MultiLineLabel, SingleDataSet } from 'ng2-charts';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';

@Component({
  selector: 'app-specialities-chart',
  templateUrl: './specialities-chart.component.html',
  styleUrls: ['./specialities-chart.component.css']
})
export class SpecialitiesChartComponent implements OnInit, AfterViewInit {

  @Output() canvas1: EventEmitter<string> = new EventEmitter<string>();
  public gorups: any[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
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
    private specialities: SpecialityService,
    private appoService: AppointmentService
  ) { }
  ngAfterViewInit(): void {
  
  }

  ngOnInit() {
    this.appoService.getAll().subscribe(app => {

      app.map(a => {

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

      this.gorups.map(g => {
        this.barChartLabels.push(<MultiLineLabel><unknown>g.speciality);
      })
      let dataSets = [
        {
          data: this.gorups.map(g => g.count)
        }
      ]
      this.barChartData = dataSets;

      setTimeout(() => {
        const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
        this.canvas1.emit(canvas.toDataURL())
      }, 5000);

    })
  }
}