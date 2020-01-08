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

router.get('/', verify, async (req, res) => {
    let startDate = new Date();
    let date = startDate.getDate();
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
    startDate = new Date(year, month, date, 0, 0, 0).toISOString().substring(0, 10);
    let endDate = new Date(year, month, date+1, 0, 0, 0).toISOString().substring(0, 10);
    let invoices = await Invoice.find({ "createdAt" : { $gte: startDate, $lt: endDate }});
    res.json(invoices)
});

router.get('/id/:id', verify, (req, res) => {
    let { id } = req.params;
    console.log(id);
    Invoice.findById(id)
    .then(invoice => res.status(200).json(invoice))
    .catch(err => res.status(404).json(err));
});

router.get('/date/:date', verify, async (req, res) => {
    let { date } = req.params;
    let start = new Date(date);
    let date1 = start.getDate();
    let month = start.getMonth();
    let year = start.getFullYear();
    let endDate = new Date(year, month, date1+2, 0, 0, 0).toISOString().substring(0, 10);
    let invoices = await Invoice.find({ "createdAt" : { $gte: start.toISOString().substring(0, 10), $lt: endDate} });
    console.log(invoices);
    res.send(200);

});
router.get('/daterange/:start/:end', verify, (req, res) => {

});