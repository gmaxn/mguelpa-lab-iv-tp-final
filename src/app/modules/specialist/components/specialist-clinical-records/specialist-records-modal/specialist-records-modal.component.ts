import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-specialist-records-modal',
  templateUrl: './specialist-records-modal.component.html',
  styleUrls: ['./specialist-records-modal.component.css']
})
export class SpecialistRecordsModalComponent implements OnInit {

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
