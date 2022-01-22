const mongoose = require('mongoose');

const itemSchema = mongoose.Schema( {
    item1:{
        type: String,
        unique: true
    },
    item2:{
        type: String,
        unique: true
    },
    item3: {
        type : String,
        unique: true
    },
    item4: {
        type : String,
        unique: true
    }
})

module.exports = mongoose.model('CleanItem', itemSchema);