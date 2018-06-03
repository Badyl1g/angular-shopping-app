import { CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    if (!this.authService.getAuthStatus()) {
      this.router.navigate(['/recipes']);
      return false;
    } else {
      return true;
    }
    
  }

}