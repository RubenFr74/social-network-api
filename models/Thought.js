const { Schema, model } = require('mongoose');
// import module to format the timestamp 
const moment = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

// thought schema
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// get total count of friends
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// create the User model using the UserSchema
const Thought = model('Thought', thoughtSchema);
// export the Thought model
module.exports = Thought;