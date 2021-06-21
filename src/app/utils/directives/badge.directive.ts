import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBadge]'
})
export class BadgeDirective {
  @Input() public set appBadge(c:string) {
    this.renderer.addClass(this.eleRef.nativeElement,'badge');
    this.renderer.addClass(this.eleRef.nativeElement,'badge-pill');
    switch(c) {
      case 'finalized':
        this.renderer.addClass(this.eleRef.nativeElement,'badge-danger');        
      break;
      case 'taken':
        this.renderer.addClass(this.eleRef.nativeElement,'badge-primary');        
      break;
      case 'accepted':
        this.renderer.addClass(this.eleRef.nativeElement,'badge-success');        
      break;
      case 'rejected':
        this.renderer.addClass(this.eleRef.nativeElement,'badge-warning');        
      break;
    }
  }
  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2
  ) { }
}