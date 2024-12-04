import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BorrowedBooksComponent } from './components/borrowed-books/borrowed-books.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import {BorrowedBooksHistoryComponent} from './components/borrowed-books-history/borrowed-books-history.component';

const routes: Routes = [
  {
    path: '',
    component: BookListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-book',
    component: AddBookComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'borrowed-books',
    component: BorrowedBooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'borrowed-books-history',
    component: BorrowedBooksHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    ),
  ],
};
