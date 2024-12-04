import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.authService.getRoles();
    if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN')) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
