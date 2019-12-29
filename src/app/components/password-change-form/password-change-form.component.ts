import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {

  public passwordForm: FormGroup;
  public loading: boolean = false;
  public matcher = new MyErrorStateMatcher();

  constructor(private service: BackendService, 
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { 

    this.passwordForm = this.formBuilder.group({
      new: ['', Validators.required],
      confirm: ['', Validators.required]
    }, { validator: this.validatePassword});
  }

  ngOnInit() {
    
  }
  updatePassword() {
    if(this.passwordForm.get('new').errors || this.passwordForm.get('confirm').errors) {
      throw new Error("Errors.");
    }
    if(this.passwordForm.hasError('noMatch')) {
      throw new Error("Errors. Passwords don't match");
    }
    else {
      this.loading = true;
      this.passwordForm.disable();
      this.service.updateUserPassword({ 
        password: this.passwordForm.get('new').value,
        confirm: this.passwordForm.get('confirm').value})
        .subscribe((res : any) => {
          this.loading = false;
          this.passwordForm.enable();
          this.passwordForm.reset();
          this.snackBar.open('Password Updated', 'Close', {
            duration: 5000,
            verticalPosition: 'top'
          });
        }, err => {
          this.loading = false;
          this.passwordForm.enable();
          this.passwordForm.reset();
          this.snackBar.open('An error occured', 'Close', {
            duration: 5000,
            verticalPosition: 'top'
          });
        });
    }
  }
  validatePassword (group: FormGroup)  {
    return group.controls.new.value === group.controls.confirm.value ? null : { noMatch: true };
  }
}