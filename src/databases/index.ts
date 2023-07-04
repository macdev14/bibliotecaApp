import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schemas } from './schemas';
import UserModel from './models/userModel';
import ReservationModel from './models/reservationModel';
import BookModel from './models/bookModel';

const adapter = new SQLiteAdapter({
 schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses:[ UserModel,  BookModel, ReservationModel],
 
})
