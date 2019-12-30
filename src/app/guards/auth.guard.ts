import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterLink } from '@angular/router';
import { take  } from 'rxjs/operators';
import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: BackendService,
    private router: Router) {

  }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any>  {
      try {
        await this.auth.isAuthorized().toPromise();
        return true;
      }
      catch (err) {
        console.log(err);
        this.router.navigate(['/'])
        return false;
      }
  }
  
}
