const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({

    bookName: {
        type: String,
        min:3,
        max: 20
    },
    author: {
        type: String
    },
    price:{
        type: Number
    }

})

module.exports = mongoose.model('Book', bookSchema);