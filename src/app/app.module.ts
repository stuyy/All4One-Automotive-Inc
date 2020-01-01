import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, MatDialogModule, MatNativeDateModule, MatMenuModule, MatRadioModule, MatSnackBarModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { MatButtonModule } from '@angular/material/button';
import { CareersComponent } from './components/careers/careers.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CareersApplicationFormComponent } from './components/careers-application-form/careers-application-form.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewComponent } from './components/dialog-overview/dialog-overview.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuillModule } from 'ngx-quill'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JobListingCreatorComponent } from './components/job-listing-creator/job-listing-creator.component';
import { JobsPageComponent } from './components/jobs-page/jobs-page.component';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountCreatorFormComponent } from './components/account-creator-form/account-creator-form.component';
import { PasswordChangeFormComponent } from './components/password-change-form/password-change-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavService } from './services/sidenav.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { JobListingDialogComponent } from './components/job-listing-dialog/job-listing-dialog.component';
import { ServiceRequestFormComponent } from './components/service-request-form/service-request-form.component';
import { JobEditorDialogComponent } from './components/job-editor-dialog/job-editor-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleMapsComponent,
    CareersComponent,
    CareersApplicationFormComponent,
    LoginComponent,
    DialogOverviewComponent,
    DashboardComponent,
    JobListingCreatorComponent,
    JobsPageComponent,
    JobListingComponent,
    LogoutComponent,
    SettingsComponent,
    AccountCreatorFormComponent,
    PasswordChangeFormComponent,
    NavbarComponent,
    SidenavComponent,
    JobListingDialogComponent,
    ServiceRequestFormComponent,
    JobEditorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MaterialFileInputModule,
    TextFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDnijNE3qiZ97fyfzngIciBlXaLs-9GUQ'
    }),
    CdkStepperModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],    
          [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
          ['clean'],                         
          ['link', 'image', 'video']       
        ]
      },
    })
    
  ],
  providers: [SidenavService],
  bootstrap: [AppComponent], 
  entryComponents: [
    DialogOverviewComponent,
    JobListingCreatorComponent,
    JobListingDialogComponent,
    ServiceRequestFormComponent,
    JobEditorDialogComponent
  ]
})
export class AppModule { }
