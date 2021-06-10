import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-records-modal',
  templateUrl: './admin-records-modal.component.html',
  styleUrls: ['./admin-records-modal.component.css']
})
export class AdminRecordsModalComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

  confirm(appointment: any) {
    this.response.emit({
      succeed: true,
      data: 'confirm'
    });
  }

  reject() {
    this.response.emit({
      succeed: false,
      data: 'cancel'
    });
  }
}