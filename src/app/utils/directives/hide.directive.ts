import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHide]'
})
export class HideDirective {
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide();
  }

  private hide() {
    this.el.nativeElement.querySelector('div').style.visibility = 'hidden';
  }

  private show() {
    this.el.nativeElement.querySelector('div').style.visibility = 'visible';
  }
}
