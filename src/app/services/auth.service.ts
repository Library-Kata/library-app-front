import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

interface DecodedToken {
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  /**
   * Authenticate the user and store the JWT token.
   * @param username The username.
   * @param password The password.
   */
  login(username: string, password: string): Observable<string> {
    return this.http
        .post(this.apiUrl + '/login', { username, password }, { responseType: 'text' })
        .pipe(tap((token) => this.setToken(token)));
  }

  /**
   * Register a new user.
   * @param username The username.
   * @param password The password.
   */
  register(username: string, password: string, roles: string[]): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, roles }, { responseType: 'text' });
  }

  /**
   * Logout the user by removing the token and redirecting to the login page.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirect to the login page
  }

  /**
   * Check if the user is authenticated by verifying the token's expiration.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now().valueOf() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }

  /**
   * Retrieve the JWT token from local storage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Save the JWT token in local storage.
   * @param token The JWT token to save.
   */
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Retrieve the user's roles from the JWT token.
   */
  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.roles || [];
      } catch (error) {
        console.error('Error decoding token', error);
        return [];
      }
    }
    return [];
  }

  /**
   * Retrieve the username from the JWT token.
   */
  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.sub;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }
}
