import { Model } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";
import {field, relation} from "@nozbe/watermelondb/decorators";
class BookModel extends Model {
    static table = 'books';

    static associations: Associations = {
      'users': { type: 'belongs_to', key: 'user_id' },
      'reservations': { type: 'has_many', foreignKey: 'book_id' },
    };

    @field('name') name!: string;
    
    @field('author') author!: string;

    @field('uri') uri!: string;
  
    @field('user_id') userId!: string;

    @relation('users', 'user_id') users;

    @relation('reservations', 'book_id') reservations;
  
 
    
  }
  
  export default BookModel;