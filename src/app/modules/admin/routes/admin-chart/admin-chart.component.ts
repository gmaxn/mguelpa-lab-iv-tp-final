import { Component, OnInit } from '@angular/core';
import { Log, LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.css']
})
export class AdminChartComponent implements OnInit {

  public logList: Log[] = [];

  constructor(
    private logs: LoggerService
  ) { }

  ngOnInit(): void {
    this.logs.getLogs().subscribe(logs => {
      this.logList = logs;
      this.logList.map(l=>{
        l.date = new Date((<any>l.date).seconds * 1000)
      })
      console.log(logs);
    });
  }

}
