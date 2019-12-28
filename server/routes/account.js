const router = require('express').Router();
const { check, validationResult, body } = require('express-validator');
const User = require('../models/User');

router.post('/create', [
    check('username').isLength({ min: 3 }),
    check('password').isLength({ min: 5 }),
    check('email').isEmail(),
    body('confirm').custom((value, { req }) => {
        if(value !== req.body.password)
            throw new Error("Passwords do not match.");
        return true;
    }),
    body('type').custom((value) => {
        console.log(value)
        if(value === 'user' || value === 'admin')
            return true;
        else
            throw new Error("Incorrect account type specified.");
    })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({
            msg: 'Unable to process inputted data'
        })
    }
    else {
        if(req.user && req.user.type === 'admin') {
            delete req.body.confirm;;
            try {
                let newUser = new User(req.body)
                await newUser.hashPassword();
                await newUser.save(); // Save User.
                res.sendStatus(201);
            }
            catch(err) {
                console.log(err);
                res.send(403);
            }
        }
        else {
            res.send(403);
        }
    }
})

module.exports = router;