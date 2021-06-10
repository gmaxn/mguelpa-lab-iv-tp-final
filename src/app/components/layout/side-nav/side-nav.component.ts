import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UserClaims } from 'src/app/models/user-claims';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @HostListener('click', ['$event'])
  documentClick(event: any): void {
    let input: HTMLElement = (event.target as HTMLElement);

    if(input === this.elRef.nativeElement) {
      this.closeNav.emit(false);
    }
  }

  @Output() closeNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentUser: UserClaims | any;

  constructor(
    private elRef: ElementRef,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.auth.logged$.subscribe({
      next: logged => {
        if(logged) {
          this.currentUser = this.auth.getCurrentUserCredentials();
        }
      }
    })
  }

  isRole(credentials: UserClaims, role:string) {
    return credentials.roles.includes(role);
  }
}
