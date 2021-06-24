import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlur]'
})
export class BlurDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    //this.highlight();
  }

  private highlight() {
    // this.el.nativeElement.style.margin = '10px';
    this.el.nativeElement.style.border = 'green';
    // this.el.nativeElement.style.boxShadow = '0 0 3px 3px rgb(23 223 230 / 15%)';
  }
}
