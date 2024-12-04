import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AddBookComponent {
  addBookForm: FormGroup; // Declare the form group without initialization

  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {
    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  addBook() {
    const { title, author } = this.addBookForm.value;
    if (title && author) {
      this.bookService.addBook({ title, author }).subscribe({
        next: () => {
          this.successMessage = 'Book added successfully';
          this.addBookForm.reset();
        },
        error: (err) => (this.errorMessage = err.error || 'Failed to add book'),
      });
    }
  }
}
