import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, RouterLink } from '@angular/router';
import { take } from 'rxjs/operators';
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
      let b = this.auth.isAuthorized().pipe(take(1))
      try {
        let c = await b.toPromise();
        return true;
      }
      catch(err) {
        this.router.navigate(['/'])
        return false;
      }
  }
  
}
