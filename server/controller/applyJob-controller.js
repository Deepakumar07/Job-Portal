const applyjobs=require("../model/applyjobs-model");


module.exports={


    applyJob:function(req, res){
        let data=req.body;
        let appJob=new applyjobs();
        appJob.app_name=data.app_name;
        appJob.app_email=data.app_email;
        appJob.app_number=data.app_number;
        appJob.job_id=data.job_id;
        appJob.cov_letter=data.cov_letter;
        
        appJob.save({}, (err,result)=>{
            if(err){
                res.send({
                    status:false,
                    result:err
                })
            }
            else{
                res.send({
                    status:true,
                    result:result
                })
            }
        })


    }
}