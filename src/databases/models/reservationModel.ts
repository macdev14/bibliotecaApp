
import { Model} from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation } from '@nozbe/watermelondb/decorators';

class ReservationModel extends Model {
  static table = 'reservations';

  static associations: Associations = {
    'books': { type: 'belongs_to', key: 'book_id' },
    'users': { type: 'belongs_to', key: 'user_id' },
  };

  @field('book_id')
  bookId!: string;

  @field('user_id')
  userId!: string;

  @field('reservation_date')
  reservationDate!: string;

  @relation('books', 'book_id')
  book;

  @relation('users', 'user_id')
  users;

 
}

export default ReservationModel;
