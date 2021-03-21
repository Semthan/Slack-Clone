const mongoose = require('mongoose');
const channelSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel