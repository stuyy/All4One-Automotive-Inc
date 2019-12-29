import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-creator-form',
  templateUrl: './account-creator-form.component.html',
  styleUrls: ['./account-creator-form.component.css']
})
export class AccountCreatorFormComponent implements OnInit {

  public newAccountForm: FormGroup;
  public password: FormControl;
  public confirm: FormControl;
  public loading: boolean = false;
  constructor(private service: BackendService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { 
    this.newAccountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      type: ['user', [Validators.required]]
    });
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.confirm = new FormControl('', [Validators.required, Validators.minLength(5)]);
  }

  ngOnInit() {

  }
  getUsernameError() {
    let username = this.newAccountForm.get('username');
    return username.errors ? username.errors.required ? 'Username cannot be blank' : username.errors.minlength ? 'Username must be at least 3 characters' : '' : '';
  }
  getEmailError() {
    let email = this.newAccountForm.get('email');
    return email.errors ? email.errors.required ? 'Email cannot be blank' : email.errors.email ? 'Invalid Email' : '' : '';
  }
  getPasswordError() {
    return this.password.errors ? this.password.errors.required ? 'Password cannot be blank' : this.password.errors.noMatch ? 'Passwords do not match' : this.password.errors.minlength ? 'Password length must be at least 5 characters' : '' : '';
  }
  getConfirmError() {
    return this.confirm.errors ? this.confirm.errors.required ? 'Confirm Password cannot be blank' : this.confirm.errors.noMatch ? 'Passwords do not match' : this.confirm.errors.minlength ? 'Password length must be at least 5 characters' : '' : '';
  }
  createUserAccount() {
    if(this.validatePassword()) {
      let newUser = this.newAccountForm.value;
      newUser.password = this.password.value;
      newUser.confirm = this.confirm.value;
      this.loading = true;
      this.newAccountForm.disable();
      this.password.disable();
      this.confirm.disable();
      this.service.createUserAccount(newUser)
      .subscribe((res : any) => {
        this.loading = false;
        // Display Snackbar
        this.snackBar.open('Created New Account!', 'Close', {
          duration: 5000
        });
        this.newAccountForm.enable();
        this.password.enable();
        this.confirm.enable();
        this.newAccountForm.reset({
          type: "user"
        });
        this.password.reset();
        this.confirm.reset();
      }, 
      err => console.log(err)); 
    }
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
}
