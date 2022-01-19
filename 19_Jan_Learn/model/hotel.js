const mongoose = require('mongoose');

const workerSchema = mongoose.Schema({
    name: {
        type : String,
        require: true,
        message: "Please Enter your Name"
    },
    role: {
        type : String,
        enum: ['Manager','Chef','Waiter','RoomService','Cleaning']
    },
    email: {
        type : String,
        unique : true,
        message : "Please Enter Vaild Email"
    },
    password: {
        type: String,
        min : 4,
        max : 10
    }
})

module.exports = mongoose.model('Workers', workerSchema);