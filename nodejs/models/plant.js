const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    // user: {
    //     type: String,
    //     required: false
    // },
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