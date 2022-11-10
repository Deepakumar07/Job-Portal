const mongoose = require('mongoose');

const jobList_schema = mongoose.Schema({
    admin:{type:String, required:true},
    jobname: { type: String, required: true },
    jobtype: { type: String, required: true },
    job_description: { type: String, required: true },
    Due_date: { type: String, required: true },
    com_name: { type: String, required: true },
    com_email: { type: String, required: true },
    com_location: { type: String, required: true },
    status: { type: Boolean },
    featured: { type: Boolean, required: true },
    word_pitch: { type: String, required: true },
    experince: { type: Number, required: true },
    created_at: { type: Date, timestamps: true, default: Date.now },
    updated_at: { type: Date,  },

})

module.exports = mongoose.model("joblist", jobList_schema);