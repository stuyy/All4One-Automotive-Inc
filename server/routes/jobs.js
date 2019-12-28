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

module.exports = router;