import { tableSchema } from '@nozbe/watermelondb'

export const usersSchema = tableSchema({
    name: 'users',
    columns: [
        {
            name: 'username',
            type:'string'
        },
        
        {
            name: 'password',
            type:'string'
        },
        {
            name: 'permissions',
            type:'string'
        }
    ]
});