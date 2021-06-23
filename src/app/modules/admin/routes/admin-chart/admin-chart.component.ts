import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Log, LoggerService } from 'src/app/services/logger.service';

declare let pdfMake: any ;

import * as pdfMakex from "pdfmake/build/pdfmake";
import * as pdfFontsx from 'pdfmake/build/vfs_fonts';
import { collapseTextChangeRangesAcrossMultipleVersions, textChangeRangeIsUnchanged } from 'typescript';
import { PdfMakerService } from 'src/app/utils/pdf-maker.service';
import { Appointment } from 'src/app/models/appointment';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppointmentService } from 'src/app/services/appointment.service';

import { ChartOptions } from 'chart.js';
import { BaseChartDirective, MultiDataSet, MultiLineLabel, SingleDataSet } from 'ng2-charts';
import { SpecialityService } from 'src/app/services/speciality.service';
import { HttpClient } from '@angular/common/http';


(pdfMake as any).vfs = pdfFontsx.pdfMake.vfs;

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.css']
})
export class AdminChartComponent implements OnInit {

  public loading: boolean = true;

  ///////////////////////////
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
    { data: [], label: 'Especialidades' }
  ];

  ///////////////////////////

  private minDate: Date = new Date(Date.now());
  private maxDate: Date = new Date(Date.now());

  public timeline: Date[] = [];


  private appointments: Appointment[] = [];

  private specialists: any[] = [];

  private groupByDate: any[] = [];


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

  public logList: Log[] = [];

  public canvas1:string = '';
  public canvas2:string = '';
  public canvas3:string = '';
  public canvas4:string = '';
  public logo:string = '';

  constructor(
    private logs: LoggerService,
    private pdf: PdfMakerService,
    private appoService: AppointmentService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.logs.getLogs().subscribe(logs => {
      this.logList = logs;
      this.logList.map(l=>{
        l.date = new Date((<any>l.date).seconds * 1000)
      })
      console.log(logs);
    });
    this.generateCanvas1();

    this.generateCanvas2();

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

  reset() {
    this.groupByDate = [];


    this.lineChartData = [];
  
    this.lineChartLabels = [];
  
    this.lineChartColors = [];
  
    this.lineChartPlugins = [];

    this. appointments = [];

    this. specialists = [];
  
    this. groupByDate = [];

    
  this. minDate = new Date(Date.now());
  this. maxDate = new Date(Date.now());

  this. gorups = [];

  this.barChartLabels= [];
  this.barChartPlugins = [];


  }

  generateCanvas1() {
    this.reset();
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
        const canvas = <HTMLCanvasElement>document.getElementById('can1');
        this.canvas1 = (canvas.toDataURL())
        console.log('can1', this.canvas1)
      }, 2000);

    })
  }
  generateCanvas2() {
    this.reset();
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
      
        setTimeout(() => {
          const canvas = <HTMLCanvasElement>document.getElementById('can2');
          this.canvas2 = (canvas.toDataURL())
          console.log('can2', this.canvas2)
          this.loading = false;
        }, 3000);
      })
  }
  

  onCanvas1() {

    setTimeout(() => {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
      this.canvas2 = canvas.toDataURL();
      console.log("canvas1", this.canvas1); 
    }, 2000);
  }

  onCanvas2() {

    setTimeout(() => {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas2');
      this.canvas2 = canvas.toDataURL();
      console.log("canvas2", this.canvas2); 
    }, 2000);

  }

  onCanvas3(base64:string) {
    this.loading = true;
    setTimeout(() => {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas3');
      this.canvas3 = canvas.toDataURL();
      this.loading = false;
      console.log("canvas3", this.canvas3);
    }, 3000);
  }

  onCanvas4(base64:string) {
    this.loading = true;
    setTimeout(() => {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas4');
      this.canvas4 = canvas.toDataURL();
      this.loading = false;
      console.log("canvas4", this.canvas4);
    }, 3000);
  }

  generatePdf() {
    const date = new Date(Date.now());
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download(`informes-clinica-omed_${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`);
  }

  getDocumentDefinition() {

    
    return {
      content: [
        {
          text: `Informes Clínica OMED`,
          bold: true,
          fontSize: 22,
          alignment: 'left',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              this.getProfilePicObject()
            ]
          ]
        },
        ...this.getTable(this.logList),
        ...this.getCharts()

      ],
      info: {
        title: 'INFORMES CLINICA OMED',
        author: 'CLINICA OMED',
        subject: 'INFORMES',
        keywords: 'INFORMES, INFORMES ONLINE',
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
          chartTitle: {
            fontSize: 12,
            bold: true,
            margin: [0, 20, 0, 3],
            alignment: 'center'
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

  getTable(l: Log[]) {
    let table: any = [
      { text: `Log de usuarios en el sistema`, style: 'header' },
      {
        style: 'tableExample',
        table: {
          body: [
            ['Ultimo logueo', 'Usuario', 'Roles', 'Ingresos al sistema'],
            ...l.map(log => [`${log.date.toLocaleDateString()}`, `${log.user}`, `${log.roles.filter(r => r === 'admin' || r === 'patient' || r === 'specialist').map(r => {
              switch (r) {
                case 'admin':
                  r = 'administrador'
                  break;
                case 'patient':
                  r = 'paciente';
                  break;
                case 'specialist':
                  r = 'especialista';
                  break;
              }
              return r;
            }).concat(', ')}`, `${log.logs}`])
          ]
        }
      }
    ]
    return table;
  }

  getCharts() {

    let charts = [];

    if(this.canvas1 !== '') {
      charts.push(
        { text: `Turnos por especialidad`, style: 'chartTitle' },
        { image: this.canvas1, width: 450, alignment: 'center' }
      );
    }

    if(this.canvas2 !== '') {
      charts.push(
        { text: `Turnos por día`, style: 'chartTitle' },
        { image: this.canvas2, width: 450, alignment: 'center' }
      );
    }

    if(this.canvas3 !== '') {
      charts.push(
        { text: `Turnos solicitados por médico por lapso de tiempo`, style: 'chartTitle' },
        { image: this.canvas3, width: 450, alignment: 'center' }
      );
    }

    if(this.canvas4 !== '') {
      charts.push(
        { text: `Turnos finalizados por médico por lapso de tiempo`, style: 'chartTitle' },
        { image: this.canvas4, width: 450, alignment: 'center' }
      );
    }
    return charts;
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
/*
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
*/
}
