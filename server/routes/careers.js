const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');
const JobListing = require('../models/JobListing');
const MailTransporter = require('../utils/MailTransporter');
const HTMLTemplates = require('../utils/HTMLTemplates');
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
        console.log(req.file.originalname)
        let questionResponses = JSON.parse(questions);
        let jobApplication = new JobApplication({ firstName, lastName, email, phoneNumber, resume, comments, jobId, questionResponses });
        try {
            await jobApplication.save();
            console.log("Saved Job Application");
            let foundJobListing = await JobListing.findById(jobId);
            foundJobListing.applied();
            let application = {
                name: `${firstName} ${lastName}`,
                email: `${email}`,
                phone: `${phoneNumber}`,
                questions: questionResponses,
                job: foundJobListing
            }
            console.log(application);
            let htmlTemplate = HTMLTemplates.jobApplicationReceived(application);
            let transport = new MailTransporter();
            let mail = await transport.sendMail({
                receiver: process.env.GMAIL_USER,
                sender: process.env.EMAIL_USER,
                subject: `New Job Application - ${foundJobListing.jobTitle}`,
                html: htmlTemplate,
                attachments: [
                    {
                        filename: req.file.originalname,
                        path: resume
                    }
                ]
            });
            if(mail) {
                console.log("Message sent!");
                res.status(201).json({ status: 201, message: "Job application received!"});
            }
            else {
                let notSent = false;
                let i = 0;
                do {
                    console.log("Error occured, trying to send...");
                    mail = await transport.sendMail({
                        receiver: process.env.GMAIL_USER,
                        sender: process.env.EMAIL_USER,
                        subject: `New Job Application - ${foundJobListing.jobTitle}`,
                        html: htmlTemplate,
                        attachments: [
                            {
                                filename: req.file.originalname,
                                path: resume
                            }
                        ]
                    });
                    i++;
                    if(i === 20) {
                        console.log("20 times exceeded.")
                        notSent = true;
                        break;
                    };
                } while(!mail);
                if(notSent)
                    res.status(500).json({ status: 500, message: "An unknown error occured. Please try again later" });
                else {
                    console.log("Sent, took " + i + " retries.")
                    res.status(201).json({ status: 201, message: "Job application received!"});
                }
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ status: 500, message: "An unknown error occured. Please try again later" });
        }
    }
});

module.exports = router;