import { ApiProperty } from '@nestjs/swagger';
import { Schema, Types }  from 'mongoose';
import { Optional } from '@nestjs/common';

export class UpdateGroupDto {
    @ApiProperty()
    name: String;

    @ApiProperty()
    client: [{
        type: Types.ObjectId,
        ref: 'Client'
    }];
    /*
    @ApiProperty()
    message: [{
        type: Types.ObjectId,
        ref: 'Message'
    }]
    */
}