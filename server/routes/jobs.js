const router = require('express').Router();
/**
 * Create Job Listings
 */
router.post('/create', (req, res) => {
    console.log(req.body);
    res.status(201).send({
        status: 201
    })
});

module.exports = router;