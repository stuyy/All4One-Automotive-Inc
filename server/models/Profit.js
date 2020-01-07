const mongoose = require('mongoose');

const ProfitSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    type: { type: String, required: true },
    cashAmount: { type: Number, required: false },
    creditAmount: { type: Number, required: false },
    totalAmount: { type: Number, required: true },
    taxRate: { type: Number, required: false },
    description: { type: String, required: false }
}, { timestamps: { createdAt: 'createdOn'}});

const Profit = module.exports = mongoose.model('Profits', ProfitSchema);