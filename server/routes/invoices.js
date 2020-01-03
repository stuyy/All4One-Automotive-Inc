const router = module.exports = require('express').Router();
const Invoice = require('../models/Invoice');

function verify(req, res, next) {
    if(req.user && req.user.type === 'admin') {
        console.log("Admin")
        next();
    }
    else {
        console.log("No");
        res.status(403).json({ status: 403, message: "Forbidden"})
    }
}
router.get('/:id', (req, res) => {

});

router.post('/create', verify, async (req, res) => {
    let invoice = { invoiceId, companyName, checkId, make, model, year, description } = req.body;
    let newInvoice = new Invoice(invoice);
    try {
        let saveInvoice = await newInvoice.save();
        console.log("Saved Invoice.", saveInvoice);
        res.status(201).json({ status: 201, message: "Invoice Created.", invoice: saveInvoice })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "Error."})
    }
});