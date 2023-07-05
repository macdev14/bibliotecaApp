import { tableSchema } from '@nozbe/watermelondb'

export const bookSchema = tableSchema({
    name: 'books',
    columns: [
        {
            name: 'name',
            type:'string'
        },
        {
            name: 'author',
            type:'string'
        },
        {
            name: 'uri',
            type:'string'
        },
        { 
         name: 'user_id',
         type: 'string', 
         isIndexed: true 
        },
    ]
});