import { Connection } from 'mongoose';
import { ClientSchema } from './clients.schema';

export const clientProviders = [
    {
        provide: 'CLIENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];