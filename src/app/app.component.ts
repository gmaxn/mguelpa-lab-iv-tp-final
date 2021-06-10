import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sideNavAnimation, slideInAnimation } from './app-animations.module';
import { AuthenticationService } from './services/authentication.service';
import { LoadingEventService } from './services/loading-event.service';
import { RouteNameEventService } from './services/route-name-event.service';

@Component({
  selector: 'app-root',
  animations: [
    slideInAnimation,
    sideNavAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    
  ]
})
export class AppComponent {
  title = 'mguelpa-lab-iv-workspace';

  routeName = '';

  showTopNav = true;

  public enableSideNav = false;

  public loading = false;

  public logged = false;

  public isOpen = false;

  public showModal = false;

  constructor(
    private _loading: LoadingEventService,
    private _auth: AuthenticationService,
    private _routeName: RouteNameEventService
  ) {
    this._loading.changeEmitted$.subscribe(
      value => {
        this.loading = value;
      });
    this._auth.logged$.subscribe(
      logged => {
        this.logged = logged;
        if(!this.logged) {
          this.onEnableSideNav(false);
        }
      });
   this._routeName.changeEmitted$.subscribe(
      value => {
        this.routeName = value;
      });
  }

  onEnableSideNav(e: boolean) {
    this.enableSideNav = e;
    this.isOpen = e;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  onDeactivate() {
    if(this.enableSideNav) {
      this.onEnableSideNav(false);
    }
  }
}
