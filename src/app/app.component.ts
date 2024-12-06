import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  title = 'Library App';
  isAuthenticated = false;
  username;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
    const roles = this.authService.getRoles();
    this.isAdmin = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
    this.username = this.authService.getUsername(); // Fetch the username

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => window.location.reload());
  }
}
