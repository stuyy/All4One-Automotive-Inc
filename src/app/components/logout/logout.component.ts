import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: BackendService,
    private router: Router) { }

  ngOnInit() {
    this.service.logout().subscribe((res => this.router.navigate(['/login'])), 
    err => this.router.navigate(['/login']));
  }
}
