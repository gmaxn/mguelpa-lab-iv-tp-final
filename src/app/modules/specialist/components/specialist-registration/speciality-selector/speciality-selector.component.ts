import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Speciality } from 'src/app/models/speciality';
import { SpecialistService } from '../../../services/specialst.service';

@Component({
  selector: 'app-speciality-selector',
  templateUrl: './speciality-selector.component.html',
  styleUrls: ['./speciality-selector.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SpecialitySelectorComponent, 
    multi: true
  }]
})
export class SpecialitySelectorComponent implements OnInit, ControlValueAccessor {

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    let element: HTMLElement = event.target as HTMLElement;
    if (!(this.el.nativeElement as HTMLElement).contains(element) && this.showList) {
      this.showList = false;
    }
  }

  public showList:boolean = false;
  public top:string = "";
  public width:string = "";

  resizeObservable$: Observable<Event> = new Observable<Event>();
  resizeSubscription$: Subscription = new Subscription();

  value:string = '';
  onChange: ((value: string) => void) | undefined;

  @Input() public specialities: Speciality[] = [];

  @Input() public filtered: Speciality[] = [];

  public _filterTerm: string = "";

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.specialities;
  }

  constructor(
    private ss: SpecialistService,
    private el: ElementRef
  ) { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    //throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {

    let input = (this.el.nativeElement as HTMLElement).getElementsByTagName("input")[0];
    let button = (this.el.nativeElement as HTMLElement).getElementsByTagName("button")[0];

    if(isDisabled) {
      input.setAttribute("disabled", "true");
      button.setAttribute("disabled", "true");
    }
    else {
      input.removeAttribute("disabled");
      button.removeAttribute("disabled");
    }  
  }

  ngOnInit(): void {

    this.initSpecialitiesList();
  }

  initSpecialitiesList(): void {

    this.ss.getSpecialities().subscribe({
      next: response => {
        this.specialities = response;
        this.filtered = response;
      },
      error: err => console.log(err)
    });
  }

  onSpecialitySelection(speciality:Speciality) {
    this.value = speciality.name;
    this.onChange!(this.value);
    this.showList = false;
  }

  onShowList() {

    const observer = new ResizeObserver(entries => {
      let dropdownContainer = (this.el.nativeElement as HTMLElement).getElementsByTagName("div")[0];
      let input = (this.el.nativeElement as HTMLElement).getElementsByTagName("input")[0];
      let button = (this.el.nativeElement as HTMLElement).getElementsByTagName("button")[0];

      let rectInput = input.getBoundingClientRect();
      let rectbutton = button.getBoundingClientRect();
      
      entries.forEach(() => {
        if(dropdownContainer) {
          dropdownContainer.style.width = `${rectInput.width /*+ rectbutton.width*/}px`;
          dropdownContainer.style.marginTop = `${rectInput.height}px`;
        }
      });
    });
    
    observer.observe((this.el.nativeElement as HTMLElement).getElementsByTagName("input")[0]);

    this.showList = !this.showList;
  }

  onNewSpeciality(specialityName:string) {
    const newSpeciality: Speciality = {
      name: specialityName,
      isActive: true,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/clinica-online-test.appspot.com/o/specialities%2Fdefault.jpg?alt=media&token=c2ca5e64-039d-468f-b880-70c37e41995d'
    };
    this.ss.addSpeciality(newSpeciality);
    this.onSpecialitySelection(newSpeciality);
  }

  performFilter(filterBy: string): any {

    filterBy = filterBy.toLocaleLowerCase();
    return this.specialities.filter(
      (speciality: any) => speciality.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}
