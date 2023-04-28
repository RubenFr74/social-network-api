const { Schema, Types } = require('mongoose');
// import module to format the timestamp 
const dateFormat = require('../utils/dateFormat')

//reaction schema
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
       },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
)

module.exports = reactionSchema;