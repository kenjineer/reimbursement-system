import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AccessGuard } from './guards/access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'api/login', pathMatch: 'full' },
  {
    path: 'api/login',
    component: LoginComponent,
    data: { requiredLogout: true },
    canActivate: [AccessGuard],
  },
  {
    path: 'api/dashboard',
    component: MainComponent,
    data: { requiredLogin: true },
    canActivate: [AccessGuard],
  },
  {
    path: 'api/reimbursement',
    component: MainComponent,
    data: { requiredLogin: true },
    canActivate: [AccessGuard],
  },
  {
    path: 'api/account',
    component: MainComponent,
    data: { requiredLogin: true },
    canActivate: [AccessGuard],
  },
  { path: '**', redirectTo: 'api/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
