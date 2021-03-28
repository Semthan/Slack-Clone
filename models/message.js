const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new mongoose.Schema({
    by: {
        type: String,
        required: true,
      },
    byId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;