const mongoose=require("mongoose");

const apply_job = mongoose.Schema({

    app_name:{type:String , required:true},
    app_email:{type:String, required:true},
    app_number:{type:Number , required : true},
    cov_letter:{ type :String , required:true},
    job_id:{type:String},
    created_at:{type:Date ,timestamps: true, default: Date.now}

})

module.exports=mongoose.model("applied_jobs" , apply_job);