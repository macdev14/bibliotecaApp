import { appSchema } from '@nozbe/watermelondb'
import { usersSchema } from './userSchema'
import { bookSchema } from './bookSchema';
import { reservationSchema } from './reservationSchema';

export const schemas = appSchema({
    version: 8,
    tables: [
        usersSchema, bookSchema, reservationSchema
    ],
}) ;