import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.getRolesFromToken(this.authService.getToken()!).includes('ADMIN')) {
      return true;
    } else {
      this.router.navigate(['/home']);  // Redirigir a home si no es admin
      return false;
    }
  }
}
