const router = module.exports = require('express').Router();

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

router.post('/create', verify, (req, res) => {
    console.log(req.body);
});