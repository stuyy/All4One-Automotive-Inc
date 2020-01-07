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
import { InvoicePageComponent } from './components/Invoices/invoice-page/invoice-page.component';
import { ProfitsPageComponent } from './components/Profits/profits-page/profits-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { animation: 'HomePage'} },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { animation: 'DashboardPage'} },
  { path: 'jobs', component: JobsPageComponent, data: { animation: 'JobsPage'} },
  { path: 'jobs/:id', component: JobsPageComponent, data: { animation: 'JobsIdPage'} },
  { path: 'logout', component: LogoutComponent }, 
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { animation: 'SettingsPage'} },
  { path: 'service', component: ServiceRequestFormComponent},
  { path: 'invoices', component: InvoicePageComponent, canActivate: [AuthGuard], data: { animation: 'InvoicePage' } },
  { path: 'profits', component: ProfitsPageComponent, canActivate: [AuthGuard], data: { animation: 'ProfitsPage' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
