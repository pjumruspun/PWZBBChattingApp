import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service'; 
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema }  from './messages.schema';
import { DatabaseModule } from '../database/database.module';
import { messageProviders } from './message.providers';
import { GroupsController } from 'src/groups/groups.controller';
import { GroupsService } from 'src/groups/groups.service';
import { ClientsService } from 'src/clients/clients.service';
import { GroupsModule } from 'src/groups/groups.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientsController } from 'src/clients/clients.controller';
import { groupProviders } from 'src/groups/group.providers';
import { clientProviders } from 'src/clients/client.providers';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
        DatabaseModule,
    ],
    controllers: [MessagesController],
    providers: [
        MessagesService,
        GroupsController,
        GroupsService,
        ClientsController,
        ClientsService,
        ...messageProviders,
        ...groupProviders,
        ...clientProviders
    ],
    exports: [MessagesService],
})
export class MessagesModule {}