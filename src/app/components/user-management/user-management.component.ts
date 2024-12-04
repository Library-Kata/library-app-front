import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {User} from '../../models/user.model';
import {RegisterComponent} from '../register/register.component';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule, RouterModule, RegisterComponent],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';
  successMessage = '';
  currentUsername: string | null = '';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.currentUsername = this.authService.getUsername();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => (this.errorMessage = err.error || 'Failed to load users'),
    });
  }

  deleteUser(username: string): void {
    if (confirm(`Are you sure you want to delete user ${username}?`)) {
      this.userService.deleteUser(username).subscribe({
        next: () => {
          this.successMessage = `User ${username} deleted successfully`;
          this.loadUsers();
        },
        error: (err) => (this.errorMessage = err.error || 'Failed to delete user'),
      });
    }
  }
}
