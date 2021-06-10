import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-appointment-modal',
  templateUrl: './admin-appointment-modal.component.html',
  styleUrls: ['./admin-appointment-modal.component.css']
})
export class AdminAppointmentModalComponent implements OnInit {

  private days: string [] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  private months: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  isInvalid: boolean = false;

  comments: string = '';

  diagnosis: string = '';

  public qualification: number = 0;

  @Input() mode:any;

  @Input() item:any;

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(appointment:any) {

    if(this.mode === 'reject' || this.mode === 'cancel') {
      if(!this.comments) {
        this.isInvalid = true;
        return;
      }
      this.isInvalid = false;
      this.response.emit({
        from: this.mode,
        succeed: true, 
        data:this.comments
      });
    }

    if(this.mode === 'review') {
      this.reject();
    }

    if(this.mode === 'rate' && this.qualification < 1) {
      this.isInvalid = true;
      return;    
    }

    if(this.mode === 'rate') {
      if(this.qualification < 1) {
        this.isInvalid = true;
        return;  
      }
      this.response.emit({
        from: this.mode,
        succeed: true, 
        data: this.qualification
      });
    }

    if(this.mode === 'finalize') {
      if(!this.comments || !this.diagnosis) {
        this.isInvalid = true;
        return;
      }
  
      this.isInvalid = false;
  
      this.response.emit({
        from: this.mode,
        succeed: true, 
        data: {
          comments: this.comments,
          diagnosis: this.diagnosis
        }
      });
    }
  }

  reject() {
    this.response.emit({
      from: this.mode,
      succeed: false, 
      data:'cancel'
    });
  }

  rate(value:number) {
    this.qualification = value;
    this.isInvalid = false;
  }

  toDateString(date:Date) {
    return `${this.days[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()}`;  
  }
}
