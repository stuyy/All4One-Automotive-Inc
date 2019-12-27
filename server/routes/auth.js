const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.send(200);
});

router.get('/login', (req, res) => res.send(req.session));
module.exports = router;