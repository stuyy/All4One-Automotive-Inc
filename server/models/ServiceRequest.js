const mongoose = require('mongoose');
const ServiceRequestSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
}, { timestamps: { createdAt: 'requestedOn' } });

module.exports = mongoose.model('ServiceRequests', ServiceRequestSchema);