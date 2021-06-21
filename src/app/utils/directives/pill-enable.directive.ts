import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Directive({
  selector: '[appPillEnable]'
})
export class PillEnableDirective {

  @Input() 
  public set appPillEnable(args:any) {

    let classes: string[] = [];

    const now = new Date(Date.now());

    let isExpired = args.appointment.date < now;

    if (args.appointment.status === 'available' && args.appointment.speciality === args.speciality && !isExpired) {
      this.eleRef.nativeElement.classList = [];
      this.renderer.addClass(this.eleRef.nativeElement,'pill');        
      this.renderer.addClass(this.eleRef.nativeElement,'available');        
    }

    if (args.appointment.status === 'taken' && args.appointment.speciality === args.speciality && !isExpired) {
      this.eleRef.nativeElement.classList = [];
      this.renderer.addClass(this.eleRef.nativeElement,'pill');        
      this.renderer.addClass(this.eleRef.nativeElement,'taken');        
    }

    if (args.appointment.speciality && args.appointment.speciality !== args.speciality && !isExpired) {
      this.eleRef.nativeElement.classList = [];
      this.renderer.addClass(this.eleRef.nativeElement,'pill');        
      this.renderer.addClass(this.eleRef.nativeElement,'expired');    
    }

    if (isExpired) {
      this.eleRef.nativeElement.classList = [];
      this.renderer.addClass(this.eleRef.nativeElement,'pill');        
      this.renderer.addClass(this.eleRef.nativeElement,'expired');        
    }

    if (args.appointment.date.getDay() === 6) {
      let day = (new Date(args.appointment.date));
      day.setHours(14, 0, 0)
      if(args.appointment.date > day) {
        this.eleRef.nativeElement.classList = [];
        this.renderer.addClass(this.eleRef.nativeElement,'pill');        
        this.renderer.addClass(this.eleRef.nativeElement,'not-available');        
      }
    }
  }
  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2
  ) { }
}
