import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrowing } from '../models/borrowing.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BorrowingService {
  private apiUrl = `${environment.apiUrl}/borrowings`;

  constructor(private http: HttpClient) {}

  /**
   * Borrow a book.
   * @param bookId The ID of the book to borrow.
   */
  borrowBook(bookId: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/borrow/${bookId}`, {}, { responseType: 'text' });
  }

  /**
   * Return a borrowed book.
   * @param borrowingId The ID of the borrowing to return.
   */
  returnBook(borrowingId: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/return/${borrowingId}`, {}, { responseType: 'text' });
  }

  /**
   * Get all borrowed books by the logged-in user.
   */
  getAllBorrowedBooks(): Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(`${this.apiUrl}/all`);
  }

  /**
   * Get books currently borrowed by the logged-in user.
   */
  getCurrentlyBorrowedBooks(): Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(`${this.apiUrl}/current`);
  }
}
