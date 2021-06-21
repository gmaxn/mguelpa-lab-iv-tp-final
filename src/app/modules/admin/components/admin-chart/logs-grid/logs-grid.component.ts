import { Component, Input, OnInit } from '@angular/core';
import { Log } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logs-grid',
  templateUrl: './logs-grid.component.html',
  styleUrls: ['./logs-grid.component.css']
})
export class LogsGridComponent implements OnInit {

  @Input() logs: Log[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  getRole(log:Log) {
    return log.roles.filter(r => r ==='admin' || r === 'patient' || r === 'specialist').join(' ');
  }

}
