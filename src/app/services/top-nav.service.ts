import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {

  private show = new BehaviorSubject(true);
  show$ = this.show.asObservable();

  constructor() { }

  hide(value:boolean) {
    this.show.next(value);
  }
}
