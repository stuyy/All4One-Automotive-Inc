import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareersComponent } from './components/careers/careers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobsPageComponent } from './components/jobs-page/jobs-page.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ServiceRequestFormComponent } from './components/service-request-form/service-request-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'HomePage'} },
  { path: 'careers', component: CareersComponent, data: { animation: 'CareersPage'} },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { animation: 'DashboardPage'} },
  { path: 'jobs', component: JobsPageComponent, data: { animation: 'JobsPage'} },
  { path: 'jobs/:id', component: JobsPageComponent, data: { animation: 'JobsIdPage'} },
  { path: 'logout', component: LogoutComponent }, 
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { animation: 'SettingsPage'} },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'service', component: ServiceRequestFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
