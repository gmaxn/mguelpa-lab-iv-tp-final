import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-specialist-appointment-modal',
  templateUrl: './specialist-appointment-modal.component.html',
  styleUrls: ['./specialist-appointment-modal.component.css']
})
export class SpecialistAppointmentModalComponent implements OnInit {

  private days: string [] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  private months: string [] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  isInvalid: boolean = false;

  comments?: string;

  diagnosis?: string;
  
  @Input() mode:any;
  
  @Input() item:any;
  
  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  ////////////////////////////////////////////////////////////////
  
  finalizeStep: number = 1;

  public fieldName: string = '';

  public fildValue: string = '';

  public clinicalRecord: FormGroup | any;
  
  public get dynamicFields() : FormArray {
    return this.clinicalRecord?.get('dynamic') as FormArray;
  }

  private _class:string = '';


  
  

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.clinicalRecord = this.initForm();
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      pressure: ['', Validators.required], 
      temperature: ['', Validators.required],
      dynamic: this.fb.array([])
    });
  }

  history() {
    if(!this.comments || !this.diagnosis) {
      this.isInvalid = true;
      return;
    }

    if(this.finalizeStep === 1) {
      this.finalizeStep = 2;
      return;
    }
  }

  back() {
    this.finalizeStep = 1;
  }

  addField() {
    this.dynamicFields.push(this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    }));
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



    if (this.mode === 'review') {
      this.reject();
    }

    if (this.mode === 'finalize') {
      if (!this.comments || !this.diagnosis) {
        this.isInvalid = true;
        return;
      }

      if (this.finalizeStep === 1) {
        this.finalizeStep = 2;
        return;
      }

      this.clinicalRecord.markAllAsTouched();


      this.isInvalid = false;

      if (this.clinicalRecord.status === 'VALID') {

        const dynamic:any[] = [];
        
        this.clinicalRecord.get('dynamic').controls.map((c: any) => {
          let value = dynamic.push(JSON.parse(`{"${c.controls.key.value.replace(' ', '_')}":"${c.controls.value.value}"}`));
        }); 

        const clinicalRecord = {}
        this.response.emit({
          from: this.mode,
          succeed: true,
          data: {
            comments: this.comments,
            diagnosis: this.diagnosis,
            clinicalRecord: {
              height: this.clinicalRecord.get('height').value,
              weight: this.clinicalRecord.get('weight').value,
              temperature: this.clinicalRecord.get('temperature').value,
              pressure: this.clinicalRecord.get('pressure').value,
              dynamic: dynamic
            }
          }
        });
      }
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
