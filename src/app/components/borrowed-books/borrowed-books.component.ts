import { Component, OnInit } from '@angular/core';
import { BorrowingService } from '../../services/borrowing.service';
import { Borrowing } from '../../models/borrowing.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css'],
  imports: [CommonModule, RouterModule],
})
export class BorrowedBooksComponent implements OnInit {
  borrowings: Borrowing[] = [];
  errorMessage = '';

  constructor(private borrowingService: BorrowingService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  /**
   * Load the list of books currently borrowed by the logged-in user.
   */
  loadBorrowedBooks(): void {
    this.borrowingService.getCurrentlyBorrowedBooks().subscribe({
      next: (data) => (this.borrowings = data),
      error: (err) => (this.errorMessage = err.error || 'Failed to load borrowed books'),
    });
  }

  /**
   * Return a borrowed book.
   * @param borrowingId The ID of the borrowing to return.
   */
  returnBook(borrowingId: number) {
    this.borrowingService.returnBook(borrowingId).subscribe({
      next: () => {
        alert('Book returned successfully');
        this.loadBorrowedBooks(); // Reload the list of borrowings
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to return book';
      },
    });
  }
}
