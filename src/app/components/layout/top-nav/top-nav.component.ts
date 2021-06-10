import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TopNavService } from 'src/app/services/top-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Input() public isOpen = false;
  public logged: boolean = false;
  public user: any = null;

  @Output() enableSideNav: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private router: Router,
    private topnav: TopNavService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.auth.logged$.subscribe(logged => {
      this.logged = logged;
      if (logged) {
        this.user = JSON.parse(localStorage.getItem('userCredentials')!);
      } else {
        localStorage.clear();
        this.user = null;
      }
    });
  }

  goToSigninPage() {
    this.router.navigate(['signin']);
    this.topnav.hide(false)
  }

  goToSignupPage() {
    this.router.navigate(['enrollment']);
    this.topnav.hide(false)
  }

  showSideNav() {
    this.enableSideNav.emit(!this.isOpen);
    this.isOpen = !this.isOpen;
  }

  signout() {
    this.auth.signOut();
  }
}