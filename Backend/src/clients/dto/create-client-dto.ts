import { ApiProperty, } from '@nestjs/swagger';
import { Types } from 'mongoose';

class GroupComplexObj  {
    @ApiProperty()
    readonly group_id: {
        type: Types.ObjectId,
        ref: 'Group',
    };
    @ApiProperty()
    readonly last_message_id: {
        type: Types.ObjectId,
        ref: 'Message',
    };
    @ApiProperty()
    readonly join: {
        type: Boolean,
        default: true,
    };
};

export class CreateClientDto {
    @ApiProperty()
    readonly name: String;

    @ApiProperty({ type: [ GroupComplexObj ]})
    readonly group: [ GroupComplexObj ];
}