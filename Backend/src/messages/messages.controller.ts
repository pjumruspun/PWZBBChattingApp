import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { GroupsController } from 'src/groups/groups.controller';
import { ClientsService } from 'src/clients/clients.service';
import { ClientsController } from 'src/clients/clients.controller';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService, 
        private groupController: GroupsController,
        private clientService: ClientsService,
        private clientController: ClientsController
    ) {}
    @Get()
    async findAll(): Promise<Message[]> {
        return this.messagesService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Message> {
        return this.messagesService.findOne(id);
    }

    @Get('/findbygroup/:groupid')
    async findbygroup(@Param('groupid') groupid: string): Promise<Message[]>{
        return await this.messagesService.findByGroup(groupid);
    }

    @Get('/read/:clientid/:groupid')
    async read(@Param('clientid') clientid: string, @Param('groupid') groupid: string): Promise<Message[]>{
        var join = await this.clientService.isJoined(clientid, groupid);
        console.log(join);
        if(join){
            var lastMessage = await this.getlastmessage(groupid);
            console.log(lastMessage)
            console.log(lastMessage._id)
            this.clientController.setlastmsg(clientid, groupid, lastMessage._id)
        }
        return await this.messagesService.findByGroup(groupid);
    }

    @ApiBody({ type: CreateMessageDto })
    @Post()
    async create(@Body() createMessageDto: CreateMessageDto) {
        const returnMessage = await this.messagesService.create(createMessageDto);
        if(createMessageDto.group != undefined){
            // this.groupController.addmessage(String(createMessageDto.group), returnMessage._id)
        }
        return returnMessage;
    }

    @ApiBody({ type: CreateMessageDto })
    @Put('/:id')
    async update(@Param('id')id: String, @Body() updateMessageDto: CreateMessageDto) {
        return await this.messagesService.update(id, updateMessageDto);
    }

    @Get('/getlastmessage/:groupid')
    async getlastmessage(@Param('groupid')groupid: string): Promise<Message> {
        var messageByGroup = await this.messagesService.findByGroup(groupid);
        var lastMessage = messageByGroup[messageByGroup.length-1];
        return lastMessage;
    }

    @Delete('/delete/:id')
    async delete(@Param('id')id: string): Promise<Message> {
        return this.messagesService.delete(id);
    }

    @Delete('/deleteall')
    async deleteAll(): Promise<Message[]> {
        return this.messagesService.deleteAll();
    }
}
