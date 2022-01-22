const mongoose = require('mongoose');
const validator = require('validator')
const workerSchema = mongoose.Schema({
    name: {
        type : String,
        require: true,
        message: "Please Enter your Name"
    },
    role: {
        type : String,
        enum: ['Manager','Chef','Waiter','Cleaning']
    },
    email: {
        type : String,
        unique : true,
        required: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter the Valid Email Address')
            }
        }
    },
    password: {
        type: String,
        min : 4,
        max : 10
    }
})

module.exports = mongoose.model('Workers', workerSchema);