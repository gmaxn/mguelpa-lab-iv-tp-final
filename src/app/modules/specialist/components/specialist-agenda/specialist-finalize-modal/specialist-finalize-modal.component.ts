import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-specialist-finalize-modal',
  templateUrl: './specialist-finalize-modal.component.html',
  styleUrls: ['./specialist-finalize-modal.component.css']
})
export class SpecialistFinalizeModalComponent implements OnInit {

  private days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  private months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  isInvalid: boolean = true;

  comments: string = '';

  diagnosis: string = '';

  finalizeStep: number = 1;


  @Input() mode: any;

  @Input() item: any;

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(appointment: any) {

    if (!this.comments || !this.diagnosis) {
      this.isInvalid = true;
      return;
    }

    if (this.finalizeStep === 1) {
      this.finalizeStep = 2;
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

  reject() {
    this.response.emit({
      from: this.mode,
      succeed: false,
      data: 'cancel'
    });
  }

  toDateString(date: Date) {
    return `${this.days[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()}`;
  }
}
