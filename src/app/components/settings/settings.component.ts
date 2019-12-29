import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';

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

  public newAccountForm: FormGroup;
  public passwordChangeForm: FormGroup;
  public newAccountPasswordForm: FormGroup;
  public password: FormControl;
  public confirm: FormControl;
  constructor(private service: BackendService, private formBuilder: FormBuilder) { 
    
    this.newAccountForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['user', [Validators.required]]
    });
    this.passwordChangeForm = formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.confirm = new FormControl('', [Validators.required, Validators.minLength(5)]);
  }

  ngOnInit() {
    
  }
  createUserAccount() {
    if(this.validatePassword()) {
      let newUser = this.newAccountForm.value;
      newUser.password = this.password.value;
      newUser.confirm = this.confirm.value;
      console.log(newUser);
      this.service.createUserAccount(newUser)
      .subscribe((res : any) => console.log(res), 
      err => console.log(err)); 
    }
  }

  updatePassword() {

  }

  getUsernameError() {
    let username = this.newAccountForm.get('username');
    return username.errors ? username.errors.required ? 'Username cannot be blank' : username.errors.minlength ? 'Username must be at least 3 characters' : '' : '';
  }
  getEmailError() {
    let email = this.newAccountForm.get('email');
    return email.errors ? email.errors.required ? 'Email cannot be blank' : email.errors.email ? 'Invalid Email' : '' : '';
  }
  validatePassword() {

    if(this.password.value !== this.confirm.value) {
      console.log(this.password.errors)
      if(this.password.hasError('required')) {
        this.password.setErrors({ noMatch: true, required: true });
      }
      else {
        this.password.setErrors({...this.password.errors, noMatch: true })
        console.log(this.password.errors)
      }
      return false;
    }
    else {
      if(this.password.hasError('required') || this.confirm.hasError('required')) {
        return false;
      }
      if(this.password.hasError('minlength') || this.confirm.hasError('minlength')) {
        return false;
      }
      else {

        this.password.setErrors(null);
        this.confirm.setErrors(null);
        return true;
      }
    }
  }
  getPasswordError() {
    return this.password.errors ? this.password.errors.required ? 'Password cannot be blank' : this.password.errors.noMatch ? 'Passwords do not match' : this.password.errors.minlength ? 'Password length must be at least 5 characters' : '' : '';
  }
  getConfirmError() {
    return this.confirm.errors ? this.confirm.errors.required ? 'Confirm Password cannot be blank' : this.confirm.errors.noMatch ? 'Passwords do not match' : this.confirm.errors.minlength ? 'Password length must be at least 5 characters' : '' : '';
  }
}
