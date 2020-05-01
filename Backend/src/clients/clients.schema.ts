import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    name: String,
    group: [
        {
            group_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group'
            },
            last_message_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
            },
            join: {
                type: Boolean,
                default: true,
            }
        }
    ]
});