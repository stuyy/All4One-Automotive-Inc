import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { MatSnackBar } from '@angular/material';

export interface NewUser {
  username: string;
  password: string;
  confirm: string;
  email: string;
  type: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

 
  public passwordChangeForm: FormGroup;
  public loading: boolean = false;
  constructor(private service: BackendService, 
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { 
    
    this.passwordChangeForm = formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  updatePassword() {

  }
}
