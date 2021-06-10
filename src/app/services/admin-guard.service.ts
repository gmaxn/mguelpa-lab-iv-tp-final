import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanLoad {
  
  private redirectUrl: string = "";

  constructor(
    private router: Router,
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('admin')) {
      this.router.navigate(['/signup']);
      return false;
    }
    return true;
  }  

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    if(!user || !user.roles.includes('admin')) {
      this.router.navigate(['/signup']);
      return false;
    }
    return true;
  }
}