import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './interface/client.interface';
import { CreateClientDto } from './dto/create-client-dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { GroupsService } from 'src/groups/groups.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
    constructor(private clientsService: ClientsService, private groupService: GroupsService) {}
    @Get()
    async findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Client> {
        return this.clientsService.findOne(id);
    }

    @Get('/findbyname/:name')
    findByName(@Param('name') name: string): Promise<Client> {
        return this.clientsService.findByName(name);
    }

    @Post()
    @ApiBody({ type: CreateClientDto })
    async create(@Body() createClientDto: CreateClientDto) {
        return await this.clientsService.create(createClientDto);
    }

    @Put('/:id')
    @ApiBody({ type: CreateClientDto })
    async update(@Param('id') id: String, @Body() updateClientDto: CreateClientDto){
        return await this.clientsService.update(id, updateClientDto);
    }

    
    //@Put('/:memberid/group/add/:groupid')
    async addmember(@Param('memberid') memberid: String, @Param('groupid') groupid: String){
        var createClientDto: any = []
        createClientDto = await this.clientsService.findOne(memberid);
        if(this.groupService.hasGroup(groupid)){
            var group = {
                _id: new Types.ObjectId,
                group_id: groupid,
                join: true
            }
            if(true){
                var dupe: Boolean = false;
                for(var i = 0; i < createClientDto.group.length; ++i){
                    console.log(createClientDto.group[i].group_id)
                    if(createClientDto.group[i].group_id == groupid){
                        dupe = true;
                        console.log("FOUND DUPE");
                    }
                }
                if(!dupe) createClientDto.group.push(group)
                else return "Duplicate group id";
                // console.log(createClientDto);
                await this.clientsService.update(memberid, createClientDto);
                return createClientDto;
            }
            else{
                return "Duplicate group id"; // Doesn't work for now
            }
        }
        else
            return "Invalid group id";
        // console.log(updateGroupDto);
    }

    // @Put('/:memberid/group/remove/:groupid')
    async removemember(@Param('memberid') memberid: String, @Param('groupid') groupid: String){
        var createClientDto: any = []
        createClientDto = await this.clientsService.findOne(memberid);
        if(this.groupService.hasGroup(groupid)){
            var group = {
                _id: new Types.ObjectId,
                group_id: groupid,
                join: true
            }

            if(true){
                for(var i = 0; i < createClientDto.group.length; ++i){
                    // console.log(createClientDto.group[i].group_id)
                    if(createClientDto.group[i].group_id == groupid){
                        createClientDto.group.splice(i, 1);
                        --i;
                    }
                }
                // console.log(createClientDto);
                await this.clientsService.update(memberid, createClientDto);
                return createClientDto;
            }
            else{
                return "Duplicate group id"; // Doesn't work for now
            }
        }
        else
            return "Invalid group id";
        // console.log(updateGroupDto);
    }

    @Put('/setjoinstatus/:memberid/:groupid/:bool')
    async setjoinstatus(@Param('memberid') memberid: String, @Param('groupid') groupid: String, @Param('bool') bool: Boolean){
        var createClientDto: any = []
        createClientDto = await this.clientsService.findOne(memberid);
        if(this.groupService.hasGroup(groupid)){
            if(true){
                for(var i = 0; i < createClientDto.group.length; ++i){
                    console.log(createClientDto.group[i].group_id)
                    if(createClientDto.group[i].group_id == groupid){
                        createClientDto.group[i].join = bool;
                    }
                }
                // console.log(createClientDto);
                await this.clientsService.update(memberid, createClientDto);
                return createClientDto;
            }
            else{
                return "Duplicate group id"; // Doesn't work for now
            }
        }
        else
            return "Invalid group id";
        // console.log(updateGroupDto);
    }

    @Put('/setlastmsg/:memberid/:groupid/:messageid')
    async setlastmsg(@Param('memberid') memberid: String, @Param('groupid') groupid: String, @Param('messageid') messageid: String){
        var createClientDto: any = []
        // console.log(messageid);
        createClientDto = await this.clientsService.findOne(memberid);
        if(this.groupService.hasGroup(groupid)){
            if(true){
                for(var i = 0; i < createClientDto.group.length; ++i){
                    // console.log(createClientDto.group[i].group_id)
                    if(createClientDto.group[i].group_id == groupid){
                        createClientDto.group[i].last_message_id = messageid;
                    }
                }
                // console.log(createClientDto);
                await this.clientsService.update(memberid, createClientDto);
                // console.log(messageid);
                return createClientDto;
            }
            else{
                return "Duplicate group id"; // Doesn't work for now
            }
        }
        else
            return "Invalid group id";
        // console.log(updateGroupDto);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: String): Promise<Client> {
        return this.clientsService.deleteById(id);
    }

    @Delete('/deleteall')
    async deleteAll(): Promise<Client[]> {
        return this.clientsService.deleteAll();
    }
}
