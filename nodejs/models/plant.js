const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    lightingRequirements: {
        type: String,
        required: false
    },
    wateringRequirements: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Plant', plantSchema)