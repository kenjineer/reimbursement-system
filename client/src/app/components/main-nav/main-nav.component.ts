import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loginService: LoginService,
    private router: Router
  ) {}

  doLogout() {
    this.loginService.logout();
  }

  activeRouteTitle() {
    if (this.router.url === '/api/dashboard') {
      return 'Dashboard';
    } else if (this.router.url === '/api/reimbursement') {
      return 'Reimbursement';
    } else if (this.router.url === '/api/account') {
      return 'Account';
    }
  }
}
