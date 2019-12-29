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
                let newUser = new User(req.body);
                newUser.createdBy = req.user.username;
                await newUser.hashPassword();
                await newUser.save(); // Save User.
                res.status(201).json({
                    status: "Success"
                })
            }
            catch(err) {
                console.log(err);
                res.status(403).json({
                    error: "Error."
                })
            }
        }
        else {
            res.send(403);
        }
    }
})

router.put('/password/update', [ 
    check('password').isLength({ min: 5 }),
    body('password').custom((value, { req }) => {
    if(value !== req.body.confirm) throw new Error("Passwords do not match");
    return true;
})], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({ msg: 'Unable to process inputed data' });
    }
    else {
        if(req.user) {
            console.log("Updating password for ", req.user.username);
            res.status(200).json({ msg: "Password Updated"});
            try {
                let findUser = await User.findById(req.user.id);
                console.log(findUser);
                let update = await findUser.updatePassword(req.body.password);
                console.log(update);
            }
            catch(err) {
                console.log(err);
            }

        }
    }
})
module.exports = router;