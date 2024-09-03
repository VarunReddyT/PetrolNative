const mongoose = require('mongoose');

const petrolSchema = new mongoose.Schema({

    reading: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Petrol = mongoose.model('data', petrolSchema);

module.exports = Petrol;