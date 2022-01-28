const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({

    book_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required : true,
        ref : 'Book'
    },
    deliveryDate: {
        type: String
    }

})

module.exports = mongoose.model('Order', orderSchema);