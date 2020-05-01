import { Module, forwardRef } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema }  from './clients.schema';
import { DatabaseModule } from '../database/database.module';
import { clientProviders } from './client.providers';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
        DatabaseModule,
        forwardRef(() => GroupsModule)
    ],
    controllers: [ClientsController],
    providers: [
        ClientsService,
        ...clientProviders,
    ],
    exports: [ClientsService],
})
export class ClientsModule {}