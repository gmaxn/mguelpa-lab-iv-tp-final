import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate, CanLoad {
  
  private redirectUrl: string = "";

  constructor(
    private router: Router,
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('user')) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }  

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('user')) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}