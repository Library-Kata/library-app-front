import { Component, OnInit } from '@angular/core';
import { BorrowingService } from '../../services/borrowing.service';
import { Borrowing } from '../../models/borrowing.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-borrowed-books-history',
  templateUrl: './borrowed-books-history.component.html',
  styleUrl: './borrowed-books-history.component.css',
  imports: [CommonModule, RouterModule],
})
export class BorrowedBooksHistoryComponent implements OnInit {
  borrowings: Borrowing[] = [];
  errorMessage = '';

  constructor(private borrowingService: BorrowingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  /**
   * Load the list of borrowings for the currently logged-in user.
   */
  loadBorrowedBooks(): void {
    this.borrowingService.getAllBorrowedBooks().subscribe({
      next: (data) => (this.borrowings = data),
      error: (err) => (this.errorMessage = err.error || 'Failed to load borrowed books'),
    });
  }

  /**
   * Print the list of borrowed books.
   */
  printBooks() {
    window.print();
  }
}
