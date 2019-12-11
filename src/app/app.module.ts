import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GoogleMapsComponent,
    CareersComponent,
    CareersApplicationFormComponent
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
    CdkStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
