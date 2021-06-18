import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalEventService } from 'src/app/services/modal-event.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  @Input() item: any;

  @Input() title: string = '';

  constructor(
    private _modal: ModalEventService
  ) { }

  ngOnInit(): void {

    // this._modal.changeEmitted$.subscribe(res => {
    //   if(res.config) {
    //     this.title = res.config.title,
    //     // this.content = res
    //   }
    // })
  }

  confirm(appointment: any) {
    this._modal.emitChange(false);
    this.response.emit({
      succeed: true,
      data: 'confirm'
    });
  }

  reject() {
    this._modal.emitChange(false);
    this.response.emit({
      succeed: false,
      data: 'cancel'
    });
  }
}
