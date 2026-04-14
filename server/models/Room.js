const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },

    specs: {
        paintBrand: String,
        paintColor: String,
        windowDimensions: String,
    },

    maintenanceLog: [
        {
            item: String,
            lastServiceDate: { type: Date, default: Date.now },
            status: { type: String, default: "Good" }
        }
    ]
});

module.exports = mongoose.model('Room', roomSchema);