const router = require('express').Router();
const JobListing = require('../models/JobListing');

/**
 * Create Job Listings
 */
router.post('/create', async (req, res) => {

    // Check if the person making POST request is authorized.
    if(req.user && req.user.type === 'admin') {
        let { jobTitle, jobDeadline, jobDescription } = req.body;
        console.log(jobTitle, jobDeadline, jobDescription)
        let job = new JobListing({ 
            jobTitle,
            jobDeadline,
            jobDescription,
            postedBy: req.user.username
        });
        let newSavedJob = await job.save()
            .catch(err => {
                console.log(err);
                res.status(500);
            });
        if(newSavedJob) {
            console.log("Saved!");
            res.send({
                status: 201,
                message: "Job Listing Posted"
            })
        }
    }
    else
        res.status(403);
 
});

router.get('/listings', async (req, res) => {
    console.log(req.user)
    if(req.user && req.user.type === 'admin') {
        let jobs = await JobListing
            .find()
            .sort({ _id: -1 })
            .limit(10)
            .catch(err => res.status(500).json({ error: err }));
        if(jobs) {
            console.log(jobs);
            res.json(jobs)
        }
    }
    else res.status(403);
})
module.exports = router;