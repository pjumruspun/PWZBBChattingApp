import { Document, Types } from 'mongoose';

export interface Client extends Document {
    readonly name: String,
    readonly group: [
        {
            group_id: {
                type: Types.ObjectId,
                ref: 'Group',
            },
            last_message_id: {
                type: Types.ObjectId,
                ref: 'Message',
            },
            join: {
                type: Boolean,
                default: true,
            }
        }
    ];
}

// export interface Message extends MessageEntity, Document {};