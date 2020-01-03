const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true },
    companyName: { type: String, required: true },
    checkId: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const Invoice = module.exports = mongoose.model('Invoices', InvoiceSchema);