const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.post('/login', 
    passport.authenticate('local', { failureRedirect: 'unauthorized'}), 
    async (req, res) => {
    res.status(200).json({
        status: 200
    })
});

router.get('/unauthorized', (req, res) => res.send(403));
router.get('/login', (req, res) => res.send(req.session));

router.get('/authenticated', (req, res) => {
    if(req.user) res.status(200).json({ status: 200 });
    else res.status(403).json({ status: 403 });
})
module.exports = router;