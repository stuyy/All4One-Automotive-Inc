const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');
const JobListing = require('../models/JobListing');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:\\Users\\Anson\\Desktop\\JobResumes')
    },
    filename: (req, file, cb) => {
        console.log("File:", file);
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/apply', upload.single('resume'), [
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('email').isEmail(),
    check('comments').notEmpty(),
    check('phoneNumber').custom((value, { req }) => {
        let r = new RegExp(/^([0-9]{3}-){2}[0-9]{4}$/);
        if(r.test(value)) 
            return true;
        else throw new Error("Invalid Phone Number")
    }),
], async (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.status(422).json({ status: 422, error: 'Unable to process entity'})
    }
    else {
        let { firstName, lastName, email, phoneNumber, comments, jobId, questions } = req.body;
        let resume = req.file.path;
        let questionResponses = JSON.parse(questions);
        let jobApplication = new JobApplication({ firstName, lastName, email, phoneNumber, resume, comments, jobId, questionResponses });
        try {
            await jobApplication.save();
            console.log("Saved Job Application");
            let foundJobListing = await JobListing.findById(jobId);
            foundJobListing.applied();
            res.status(201).json({ status: 201, message: "Job application received!"})
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "An unknown error occured. Please try again later" });
        }
    }
});

module.exports = router;