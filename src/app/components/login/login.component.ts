import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: FormControl = new FormControl('', [Validators.required])
  public password: FormControl = new FormControl('', [Validators.required]);
  public loading: boolean = false;
  constructor(private backendService: BackendService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.backendService.isAuthorized().subscribe((res => this.router.navigate(['/dashboard'])))
  }
  login() {
    if(!this.username.errors && !this.password.errors) {
      this.username.disable();
      this.password.disable();
      this.loading = true;
      this.backendService.login({
        username: this.username.value,
        password: this.password.value
      })
      .subscribe((response : any) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
        location.reload();
      },
      err => {
        setTimeout(() => {
          this.loading = false;
          this.dialog.open(DialogOverviewComponent, {
            height: '200px',
            width: '400px',
            data: {
              title: 'Error',
              message: `<p>You entered an invalid Username and/or Password.</p>`
            }
          });
          this.username.enable();
          this.password.enable();
        }, 1500);
      });
    }
  }
  getUsernameError() {
    return this.username.hasError('required') ? 'Username cannot be blank.' : '';
  }
  getPasswordError() {
    return this.password.hasError('required') ? 'Password cannot be blank' : '';
  }
}
