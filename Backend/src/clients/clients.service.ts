import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client } from './interface/client.interface';
import { CreateClientDto } from './dto/create-client-dto';

@Injectable()
export class ClientsService {
    constructor(
        @Inject('CLIENT_MODEL') private clientModel: Model<Client>
    ){}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const createdClient = new this.clientModel(createClientDto);
        return await createdClient.save();
    }

    async findAll() {
        return await this.clientModel.find().exec ();
    }

    async findByName(name: string): Promise<Client> {
        return await this.clientModel.findOne({ name: name });
    }

    async findOne(id: String): Promise<Client> {
        return await this.clientModel.findOne({ _id: id });
    }

    async update(id: String, createClientDto: CreateClientDto) {
        await this.clientModel.findByIdAndUpdate(id, createClientDto);
        return await this.clientModel.findById(id);
        
    }

    async deleteById(id: String) {
        return await this.clientModel.findByIdAndDelete(id);
    }

    async deleteAll(): Promise<Client[]> {
        var deletedClients = [];
        var allClients = await this.findAll();
        allClients.forEach(client => {
            deletedClients.push(client);
            this.deleteById(client._id);
        });
        return deletedClients;
    }

    async hasClient(id: String){
        var found = await this.clientModel.findOne({ _id: id }) != null;
        // console.log(found);
        return found;
    }

    async isJoined(clientid: String, groupid: String){
        var client = await this.clientModel.findOne({ _id: clientid });
        // console.log(client);
        var groupList = client.group;
        // console.log(groupList)
        var targetGroupJoiningStatus;
        groupList.forEach(group => {
            if(String(group.group_id) == groupid){
                targetGroupJoiningStatus = group.join;
            }
        });
        return targetGroupJoiningStatus;
    }
}
