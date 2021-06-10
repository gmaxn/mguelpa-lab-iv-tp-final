import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  @Input() prompt:any = {
    show: false
  };
  public message:string = '';
  public autoCompletarDatos:boolean = false;
  private mode: Subject<string> = new Subject<string>();
  public mode$: Observable<string> = this.mode.asObservable();

  constructor() { 
  }


  ngOnInit(): void {
  }

  onPrompt(error:any) {
    this.prompt.show = true;
    this.prompt.message = error;
    this.prompt.buttons = ['Ok'];
  }

  onResponse(response:any) {
    this.prompt = response;
  }

  onAutoCompletarDatos(value:boolean) {
    this.autoCompletarDatos = value;
  }

  user(mode:string) {
    this.mode.next(mode);
  }
}
