const mongoose = require('mongoose');

const jobApplicantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }, 
    phoneNumber: { type: String, required: true },
    resume: { type: String, required: true },
    comments: { type: String, required: true },
    jobId: { type: String, required: true }
}, { timestamps: true })


const JobApplication = module.exports = mongoose.model('JobApplicants', jobApplicantSchema);