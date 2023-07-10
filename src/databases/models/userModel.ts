import { Q } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Model, { Associations } from '@nozbe/watermelondb/Model';
class UserModel extends Model {
  static table = 'users';

  // static associations: Associations = {
  //   'books': { type: 'has_many', foreignKey: 'user_id' },
  // };

  @field("username") username!: string;

  @field("password") password!: string;
  
  @field("permissions") permissions!: Permissao;
  
 
  // @relation('books', 'user_id') books;

  
  get reservations() {
    return this.collections.get('reservations').query(Q.where('user_id', this.id));
  }

  get isSuperUser() {
    return this.permissions.includes('super_user');
  }
  get isNormalUser() {
    return this.permissions.includes('normal_user');
  }
}

export default UserModel;
