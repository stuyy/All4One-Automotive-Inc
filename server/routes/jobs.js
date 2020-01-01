const router = require('express').Router();
const JobListing = require('../models/JobListing');

function verifyUser(req, res, next) {
    if(req.user && req.user.type) next();
    else {
        res.status(403).json({ status: 403, error: "Forbidden" });
    }
}
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
        res.send(403);
});
router.get('/listings/:id', async (req, res) => {
    if(req.params.id) {
        console.log(req.params.id);
        let jobs = await JobListing.findById(req.params.id)
            .catch(err => console.log(err));
        if(jobs) {
            res.json([jobs]);
        }
    }
    else res.send(403);
});

router.get('/listings', async (req, res) => {
    let jobs = await JobListing
        .find()
        .sort({ _id: -1 })
        .limit(10)
        .catch(err => res.status(500).json({ error: err }));
    if(jobs) {
        console.log(jobs);
        res.json(jobs)
    }
    else res.send(403);
});

router.delete('/delete/:id', verifyUser, (req, res) => {
    let id = req.params.id;
    JobListing.findByIdAndDelete(id)
        .then(job => res.status(200).json({ status: 200, message: "Succes", id }))
        .catch(err => res.status(422).json({ status: 422, message: "Job not found"}));
})
module.exports = router;