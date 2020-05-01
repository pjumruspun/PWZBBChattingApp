import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './interfaces/group.interface';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto'
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { ClientsController } from 'src/clients/clients.controller';
import { MessagesService } from 'src/messages/messages.service';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
    constructor(
        private groupsService: GroupsService, 
        private clientsService: ClientsService, 
        private clientController: ClientsController,
        private messageService: MessagesService,
    ) {}
    @Get()
    async findAll(): Promise<Group[]> {
        return this.groupsService.findAll();
    }

    @Get('/findbyname/:name')
    async findByName(@Param('name') name: string): Promise<Group> {
        return this.groupsService.findByName(name);
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Group> {
        return this.groupsService.findOne(id);
    }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupsService.create(createGroupDto);
    }

    @Put('/:groupid/client/add/:memberid')
    async addmember(@Param('groupid') groupid: String, @Param('memberid') memberid: String){
        var updateGroupDto: any = []
        var messages = await this.messageService.findByGroup(String(groupid));
        // console.log(messages);
        // console.log(messages[messages.length-1])
        var last_message = messages[messages.length-1];
        updateGroupDto = await this.groupsService.findOne(groupid);
        if(this.clientsService.hasClient(memberid)){
            var member: Types.ObjectId = new Types.ObjectId(String(memberid))
            // console.log(updateGroupDto.client.indexOf(member));
            if(updateGroupDto.client.indexOf(member) == -1)
            {
                updateGroupDto.client.push(member);
                await this.groupsService.update(groupid, updateGroupDto);
                this.clientController.addmember(memberid, groupid);
                // this.clientController.setlastmsg(memberid, groupid, String(last_message._id));
                return updateGroupDto;
            }
            else return "Duplicate member id"
            
        }
        else
            return "Invalid member id";
        // console.log(updateGroupDto);
    }

    @Put('/:groupid/client/remove/:memberid')
    async removemember(@Param('groupid') groupid: String, @Param('memberid') memberid: String){
        var updateGroupDto: any = []
        updateGroupDto = await this.groupsService.findOne(groupid);
        if(this.clientsService.hasClient(memberid)){
            var member: Types.ObjectId = new Types.ObjectId(String(memberid))
            // console.log(updateGroupDto.client.indexOf(member));
            if(updateGroupDto.client.indexOf(member) != -1)
            {
                updateGroupDto.client.remove(member);
                this.clientController.removemember(memberid, groupid);
                await this.groupsService.update(groupid, updateGroupDto);
                return updateGroupDto;
            }
            else return "No member id in group"
            
        }
        else
            return "Invalid member id";
        // console.log(updateGroupDto);
    }

    
    async addmessage(groupid: String, messageid: String){
        var updateGroupDto: any = []
        updateGroupDto = await this.groupsService.findOne(groupid);
        if(this.messageService.hasMessage(messageid)){
            var message: Types.ObjectId = new Types.ObjectId(String(messageid))
            // console.log(updateGroupDto.client.indexOf(member));
            if(updateGroupDto.message.indexOf(message) == -1)
            {
                updateGroupDto.message.push(message);
                await this.groupsService.update(groupid, updateGroupDto);
                return updateGroupDto;
            }
            else return "Duplicate member id"
            
        }
        else
            return "Invalid member id";
        // console.log(updateGroupDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: String): Promise<Group> {
        return this.groupsService.deleteById(id);
    }

    @Delete('/deleteall')
    async deleteAll(): Promise<Group[]> {
        return this.groupsService.deleteAll();
    }
}
