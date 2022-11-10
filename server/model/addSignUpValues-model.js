const mongoose = require('mongoose');


const add_user = mongoose.Schema({

    username: { type: String, required: true, },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nationality: { type: String },
    university: { type: String },
    highest_Qualification: { type: String },
    major: { type: String },
    jwtToken: { type: String, },
    job_prefrence: { type: String },
    status: { type: Boolean, required: true },
    created_at: { type: Date, timestamps: true, default: Date.now },
    updated_at: { type: Date,},
})

module.exports = mongoose.model("loginvalues", add_user);