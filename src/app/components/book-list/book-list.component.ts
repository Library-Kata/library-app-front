import { Component, OnInit } from '@angular/core';
import { BookService} from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BorrowingService} from '../../services/borrowing.service';
import {Book} from '../../models/book.model';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  errorMessage = '';
  successMessage = '';
  isAdmin = false;

  constructor(private bookService: BookService, private authService: AuthService,private borrowingService: BorrowingService) {}

  ngOnInit(): void {
    this.loadBooks();
    const roles = this.authService.getRoles();
    this.isAdmin = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN');
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => (this.errorMessage = err.error || 'Failed to load books'),
    });
  }

  borrowBook(bookId: number): void {
    this.borrowingService.borrowBook(bookId).subscribe({
      next: () => {
        this.successMessage = 'Book borrowed successfully';
        this.loadBooks();
      },
      error: (err) => (this.errorMessage = err.error || 'Failed to borrow book'),
    });
  }
}
