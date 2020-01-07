const router = module.exports = require('express').Router();
const Profit = require('../models/Profit');

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

router.post('/create', verify, (req, res) => {
    let { quoteId, type, taxRate, description } = req.body;
    let cashAmount, creditAmount, totalAmount;
    if(type === 'cash') {
        cashAmount = totalAmount = req.body.cashAmount;
        new Profit({ _id: quoteId, type, taxRate, description, cashAmount, totalAmount })
            .save()
            .then(profit => res.status(201).json({ status: 201, message: "Success. Created Profit." }))
            .catch(err => res.status(500).json({ status: 500,message: "Error.", error: err }))
    }
    else if(type === 'credit') {
        creditAmount = totalAmount = req.body.creditAmount;
        new Profit({ _id: quoteId, type, taxRate, description, creditAmount, totalAmount })
            .save()
            .then(profit => res.status(201).json({ status: 201, message: "Success. Created Profit." }))
            .catch(err => res.status(500).json({ status: 500,message: "Error.", error: err  }))
    }
    else if(type === 'both') {
        totalAmount = req.body.totalAmount;
        cashAmount = req.body.cashAmount;
        creditAmount = req.body.creditAmount;
        if(totalAmount != (cashAmount + creditAmount)) 
            throw new Error("Total amount does not match sum of cash and credit amount");
        else {
            new Profit({ _id: quoteId, type, taxRate, description, cashAmount, creditAmount, totalAmount })
                .save()
                .then(profit => res.status(201).json({ status: 201, message: "Success. Created Profit."}))
                .catch(err => res.status(500).json({ status: 500, message: "Error.", error: err}))
        }
    }
});

router.get('/', verify, async (req, res) => {
    let startDate = new Date();
    let date = startDate.getDate();
    let month = startDate.getMonth();
    let year = startDate.getFullYear();
    startDate = new Date(year, month, date, 0, 0, 0).toISOString().substring(0, 10);
    let endDate = new Date(year, month, date+1, 0, 0, 0).toISOString().substring(0, 10);
    let profits = await Profit.find({ "createdOn" : { $gte: startDate, $lt: endDate }});
    res.json(profits)
});

router.get('/:id', verify, (req, res) => {
    Profit.findById(req.params.id).then(profit => {
        res.send(profit);
    }).catch(err => res.send(err))
});
