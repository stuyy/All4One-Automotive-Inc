const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: 'unauthorized'}), async (req, res) => {
    res.status(200).json({
        status: 200
    })
});

router.get('/unauthorized', (req, res) => res.send(403));
router.get('/login', (req, res) => res.send(req.session));
module.exports = router;