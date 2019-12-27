const router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.post('/apply', (req, res) => {
    console.log(req.body);
});

/**
 * Create Job Listings
 */
router.post('/create', (req, res) => {
    
});
module.exports = router;