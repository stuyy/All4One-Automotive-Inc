const router = module.exports = require('express').Router();
const Profit = require('../models/Profit');
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

router.get('/', verify, async (req, res) => {
    let startDate = new Date();
    let date = startDate.getDate();
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
    startDate = new Date(year, month, date, 0, 0, 0).toISOString().substring(0, 10);
    let endDate = new Date(year, month, date+1, 0, 0, 0).toISOString().substring(0, 10);
    let profits = await Profit.find({ "createdOn" : { $gte: startDate, $lt: endDate }});
    let invoices = await Invoice.find({ "createdAt" : { $gte: startDate, $lt: endDate }});
    res.json({
        profits,
        invoices
    })
})