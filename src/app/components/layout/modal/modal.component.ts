import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  @Input() item: any;

  @Input() title: string = '';

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
