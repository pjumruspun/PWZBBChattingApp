import * as mongoose from 'mongoose';
import { Schema, Types }  from 'mongoose';

export const GroupSchema = new mongoose.Schema({
    name: String,
    client: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    /*
    message: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
    */
});