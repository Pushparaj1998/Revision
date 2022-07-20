const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    exp_month:{
        type: Number
    },
    exp_year: {
        type: Number
    },
    card_id:{
        type: String
    },
    number: {
        type: String
    },
    fingerprint: {
        type: String
    },
    name: {
        type: String
    },
    customer_id: {
        type: String
    },
    brand: {
        type: String
    },
    default: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('card', CardSchema);