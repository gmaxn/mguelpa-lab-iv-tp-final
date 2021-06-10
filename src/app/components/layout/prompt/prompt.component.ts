import { Component,  EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  @Output() value: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onConfirm(event:Event) {
    const value = (<HTMLButtonElement>event.target)?.value;
    this.value.emit((value === 'yes'))
  }
}
