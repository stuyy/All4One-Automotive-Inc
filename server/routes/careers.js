const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const JobApplicantion = require('../models/JobApplication');
const multer = require('multer')({ dest: 'C:\\Users\\Anson\\Desktop\\JobResumes'});

router.post('/apply', multer.single('resume'), (req, res) => {
    console.log(req.body);
    console.log(req.file)
});

module.exports = router;