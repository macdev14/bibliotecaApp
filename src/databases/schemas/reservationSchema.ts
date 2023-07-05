import { tableSchema } from "@nozbe/watermelondb";

export const reservationSchema =  tableSchema({
    name: 'reservations',
    columns: [
      { name: 'book_id', type: 'string', isIndexed: true },
      { name: 'user_id', type: 'string', isIndexed: true },
      { name: 'reservation_date', type: 'string' },
    ],
  })