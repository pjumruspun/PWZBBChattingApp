import { Document } from 'mongoose';
import { Types }  from 'mongoose';

export interface Message extends Document {
    readonly content: String,
    readonly timestamp: {
        type: Date,
        default: Date
    },
    readonly sender: {
        type: Types.ObjectId,
        ref: 'Client'
    },
    readonly group: {
        type: Types.ObjectId,
        ref: 'Group'
    },
}

// export interface Message extends MessageEntity, Document {};