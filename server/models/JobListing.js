const mongoose = require('mongoose');
const JobListingSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDeadline: { type: String, required: true },
    jobDescription: { type: String, required: true },
    postedBy: { type: String, required: true }
}, { timestamps: { createdAt: 'postedOn' } });


class JobListing {
    getJobTitle() {
        return this.jobTitle;
    }
    getJobDeadline() {
        return this.jobDeadline;
    }
    getJobDescription() {
        return this.jobDescription;
    }
    getPostedDate() {
        return this.postedOn;
    }
}

JobListingSchema.loadClass(JobListing);
module.exports = mongoose.model('JobListing', JobListingSchema);