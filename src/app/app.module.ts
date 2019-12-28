import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, MatDialogModule, MatNativeDateModule, MatMenuModule } from '@angular/material';
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
      apiKey: 'AIzaSyDQvn6kYmdaNCEbH5EmKwUZeA54qMUD2lE'
    }),
    CdkStepperModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
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
      placeholder: 'Job Description'
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent], 
  entryComponents: [
    DialogOverviewComponent,
    JobListingCreatorComponent
  ]
})
export class AppModule { }
