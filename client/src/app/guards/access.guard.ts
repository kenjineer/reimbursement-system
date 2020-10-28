import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin = route.data.requiresLogin || false;
    const isLoggedIn = this.loginService.isLoggedIn();

    if ((requiresLogin && isLoggedIn) || !(requiresLogin && isLoggedIn)) {
      return true;
    } else if (requiresLogin && !isLoggedIn) {
      return false;
    } else if (!requiresLogin && isLoggedIn) {
      this.router.navigate(['user/dashboard']);
      return false;
    }
  }
}
