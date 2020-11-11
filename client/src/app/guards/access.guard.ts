import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredLogin = route.data.requiredLogin || false;
    const requiredLogout = route.data.requiredLogout || false;
    const isLoggedIn = this.loginService.isLoggedIn();
    const isLoggedOut = this.loginService.isLoggedOut();

    if ((requiredLogin && isLoggedIn) || (requiredLogout && isLoggedOut)) {
      return true;
    } else if (requiredLogin && !isLoggedIn) {
      this.router.navigate(['api/login']);
    } else {
      this.router.navigate(['api/dashboard']);
      return false;
    }
  }
}
