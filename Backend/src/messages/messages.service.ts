import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message } from './interfaces/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @Inject('MESSAGE_MODEL') private messageModel: Model<Message>
    ){}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    async findAll(): Promise<Message[]> {
        return await this.messageModel.find().exec();
    }

    async findOne(id): Promise<Message> {
        return await this.messageModel.findOne({ _id: id });
    }
    async hasMessage(id: String) {
        var found = await this.messageModel.findOne({ _id: id }) != null;
        // console.log(found);
        return found;
    }

    async update(id: String, updateMessageDto: CreateMessageDto){
        await this.messageModel.findByIdAndUpdate(id, updateMessageDto);
        return await this.messageModel.findById(id);
    }

    async findByGroup(groupid: string): Promise<Message[]> {
        const allMessages = await this.findAll();
        var messageList = []
        allMessages.forEach(message => {
            if(String(message.group) == groupid){
                messageList.push(message);
            }
        });
        return messageList;
    }

    async delete(messageid: string): Promise<Message> {
        return this.messageModel.findByIdAndDelete(messageid);
    }

    async deleteAll(): Promise<Message[]> {
        var deletedMessages = [];
        var allMessages = await this.findAll();
        allMessages.forEach(message => {
            deletedMessages.push(message);
            this.delete(String(message._id));
        });
        return allMessages;
    }
}
