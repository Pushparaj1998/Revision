const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        min:3,
        max: 20
    },
    email: {
        type: String
    },
    DOB:{
        type: Date,
        message: ("Invalid Date Format")
    },
    experience: {
        type: Number,
        min:1,
        max:10
    },
    team:{
        type: String,
        enum: ['Development','Marketing','ContentWriting','Designing']
    }

})

const roleSchema = mongoose.Schema({
    role: {
        type : String,
        enum: ['Employee', 'Manager'],
        message: 'Invaild Role'
    }
})
roleSchema.add(userSchema).add({age: Number});

module.exports = mongoose.model('User', roleSchema)