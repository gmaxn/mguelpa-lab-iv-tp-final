import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-appointment-modal',
  templateUrl: './patient-appointment-modal.component.html',
  styleUrls: ['./patient-appointment-modal.component.css']
})
export class PatientAppointmentModalComponent implements OnInit {

  @Input() item:any;

  isInvalid: boolean = false;

  comments: string = '';

  @Input() mode: string = '';

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(appointment:any) {
    if(!this.comments) {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;

    this.response.emit({
      succeed: true, 
      data:this.comments
    });
  }

  reject() {
    this.response.emit({
      succeed: false, 
      data: null
    });
  }
}
