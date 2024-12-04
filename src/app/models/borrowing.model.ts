import { Book } from './book.model';
import { User } from './user.model';

export interface Borrowing {
  id: number;
  user: User;
  book: Book;
  borrowDate: string;
  returnedDate?: string;
}
