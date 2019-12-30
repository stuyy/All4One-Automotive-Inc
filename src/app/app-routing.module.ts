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


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'careers', component: CareersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsPageComponent },
  { path: 'jobs/:id', component: JobsPageComponent },
  { path: 'logout', component: LogoutComponent }, 
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'sidenav', component: SidenavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
