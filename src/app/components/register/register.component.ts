import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage= ''

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form group in the constructor
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['ROLE_USER', Validators.required],

    });
  }

  register() {
    const { username, password, roles } = this.registerForm.value;
    if (username && password && roles) {
      this.authService.register(username, password, [roles]).subscribe({
        next: () => window.location.reload() ,
        error: (err) => (this.errorMessage = err.error || 'Registration failed'),
      });
    }
  }
}
