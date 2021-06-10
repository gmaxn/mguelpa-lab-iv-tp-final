import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-captcha',
  template:
    `<div id="captcha" style="border: 1px solid rgb(208, 208, 208); border-radius: 5px;">
        <input id="one" type="text" name="" class="form-control" [ngClass]="{'is-valid' : valid}" [(ngModel)]="input" (keyup)="validateCaptcha()">
        <img id="two" style="height: 80px;" [src]="src">
        <button id="three" class="btn btn-outline-info" (click)="refreshCaptcha()"><i class="fas fa-sync-alt"></i></button>
    </div>`,
  styles: [`
    #captcha {
      display: grid;
      grid-template-columns: 5px auto 5px auto 5px;
      grid-template-rows: 5px auto 5px auto 5px;
    }
    #one {
        grid-column: 2;
        grid-row: 2;
    }
    #two {
        grid-column: 2 / span 3;
        grid-row: 4;
    }
    #three {
        grid-column: 4;
        grid-row: 2;
    }
    #four {
        grid-column: 4;
        grid-row: 4;
    }`]
})
export class CustomCaptchaComponent implements OnInit {

  public input: string = '';

  private rdmKey: string = '';

  public src = '';

  public valid = false;

  @Output() isValidCaptcha: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

    this.refreshCaptcha();


  }

  validateCaptcha() {
    if(this.input === this.rdmKey) {
      this.valid = true;
    }
    else {
      this.valid = false;
    }
    this.isValidCaptcha.emit(this.valid)
  }

  refreshCaptcha() {

    this.input = '';
    
    this.src = '';

    this.valid = false;

    this.isValidCaptcha.emit(this.valid)

    this.rdmKey = this.randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    this.generateCaptcha(this.rdmKey);
  }

  private randomString(length:number, chars:string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  private generateCaptcha(random:string) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx!.font = "60px 'Londrina Sketch'";
    ctx!.fillStyle = "red";
    ctx!.fillText(random, 100, 100);
    ctx!.fillRect(200, 150, 150, 75);

    const dataUri = canvas.toDataURL();

    this.src = dataUri;
  }
}
