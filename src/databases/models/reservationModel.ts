
import { Model, Q} from '@nozbe/watermelondb';
import { Associations } from '@nozbe/watermelondb/Model';
import { field, relation } from '@nozbe/watermelondb/decorators';

class ReservationModel extends Model {
  static table = 'reservations';

  static associations: Associations = {
    'books': { type: 'belongs_to', key: 'book_id' },
    'users': { type: 'belongs_to', key: 'user_id' },
  };
  // User relation

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

  get user() {
    return this.collections.get('users').query(Q.where('user_id',this.userId)).fetch();
  }

  // get isSuperUser() {
  //   return this.users;
  // }
  // get isNormalUser() {
  //   return this.permissions.includes('normal_user');
  // }
 
}

export default ReservationModel;
