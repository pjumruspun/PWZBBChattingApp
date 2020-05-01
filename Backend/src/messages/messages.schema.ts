import * as mongoose from 'mongoose';
import { Schema }  from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
});