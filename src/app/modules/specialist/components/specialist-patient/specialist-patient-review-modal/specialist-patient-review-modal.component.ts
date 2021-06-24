import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-specialist-patient-review-modal',
  templateUrl: './specialist-patient-review-modal.component.html',
  styleUrls: ['./specialist-patient-review-modal.component.css']
})
export class SpecialistPatientReviewModalComponent implements OnInit {

  private days: string [] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  private months: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  isInvalid: boolean = false;

  comments?: string;

  diagnosis?: string;
  
  @Input() mode:any;
  
  @Input() item:any;
  
  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  ////////////////////////////////////////////////////////////////
  


  private _class:string = '';


  
  

  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.item)
  }



  
  confirm(appointment: any) {

    if (this.mode === 'reject' || this.mode === 'cancel') {
      if (!this.comments) {
        this.isInvalid = true;
        return;
      }

      this.isInvalid = false;

      this.response.emit({
        from: this.mode,
        succeed: true,
        data: this.comments
      });

    }


    alert(this.mode)

    if (this.mode === 'review') {
      this.reject();
    }

    if (this.mode === 'confirm') {
      this.reject();
    }
  }

  reject() {
    this.response.emit({
      from: this.mode,
      succeed: false, 
      data:'cancel'
    });
  }

  toDateString(date:Date) {
    return `${this.days[date.getDay()]} ${date.getDate()} de ${this.months[date.getMonth()]} del ${date.getFullYear()}`;  
  }
}
