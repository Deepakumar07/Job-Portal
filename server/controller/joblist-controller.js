const joblist_details = require("../model/joblist-model");

module.exports = {

    addNewJob: function (req, res) {
        let job_values = new joblist_details();
        job_values.admin=req.body.admin;
        job_values.jobname = req.body.jobname;
        job_values.jobtype = req.body.jobtype;
        job_values.job_description = req.body.job_description;
        job_values.Due_date = req.body.Due_date;
        job_values.com_name = req.body.com_name;
        job_values.com_email = req.body.com_email;
        job_values.com_location = req.body.com_location;
        job_values.featured = req.body.featured;
        job_values.word_pitch = req.body.word_pitch;
        job_values.experince = req.body.experince;
        job_values.status = true;

        job_values.save({}, function (err, result) {
            if (err) {
                console.log(err);
                
            }
            else {
                res.send(
                    {
                        "status":"Job Posted"
                    }
                );
            }
        })
    },
    getAllJoblist:function(req, res){
        joblist_details.find({},(err, result)=>{
            if(err){
                console.log(err);
                process.exit();
            }
            else{
                res.send({result});
            }
        })
    },
    getParticulrJob:function(req,res){
        jobname=req.body.jobname;
        joblist_details.find({jobname: { $eq:jobname}}, function(err, result){
            if(err){
                console.log(err);
                process.exit();
            }
            else{
                if(result[0].jobname !=jobname){
                    console.log("jobname is not avaliable");
                    process.exit();
                }
                else{
                    res.send({result});
                }
            }
        })
    },

    deletejob:function(req, res){
        id=req.query.id;
        joblist_details.findByIdAndDelete(id,function(err, result){
            if(err){
                res.send(
                    {
                        status:false,
                        Error:err
                    }
                )
            }
            else{
                if(result == null){
                    res.send({status:false});
                }
                res.send(
                    {
                        status:true,
                        result:result
                    }
                )
            }
        })
    },
    // getfeaturedjobs:function(req, res){
    //     joblist_details.find({featured:{$eq:true}}, function(err, result){
    //         if(err){
    //             console.log(err);
    //             process.exit();
    //         }
    //         else{
    //             res.send({result});
    //             // console.log(result);
    //         }
    //     })
    // },
   
        

    // getsearchedJob:function(req, res){
    //     const search=req.body.searchJob;
    //     let regex = new RegExp(`${search}`)
    //     joblist_details.find({jobtype:{'$regex' : regex, '$options' : '/i'}},function(err, result){
    //         if(err){
    //            res.send(
    //                {
    //                 'code': 'false',
    //                 "status": "Error Occured while login"
    //                }
    //            )
               
    //         }
    //         else{
    //             if(result[0] == null){
    //                 res.send(
    //                     {
                            
    //                         'code': 'false',
    //                        "status": "jobtype is not available" 
                                
    //                     }
    //                 )
                    
    //             }
    //             else{
    //                 res.send(
    //                     {
    //                         code:true,
    //                         result:result
    //                     }
    //                 )
    //             } 
    //         }
    //     })
    // },

    updatejob:(req,res)=>{
     data=req.body;
     id=req.body.id
    joblist_details.findByIdAndUpdate(id,{
        $set:{
            jobtype:data.jobtype,
            jobname:data.jobname,
            com_name:data.com_name,
            com_location:data.com_location,
            job_description:data.job_description,
            Due_date:data.Due_date,
            com_email:data.com_email,
            word_pitch:data.word_pitch,
            experince:data.experince,
            updated_at:Date.now(),
            featured:data.featured
        }
    },{ multi: true }, function(err, result){
        if(err){
            
            res.send({
                status:"false",
                Error:err
            })
        }
        else{
            if(result == null){
                res.send({
                    status:false
                })
            }
            else{
                res.send(
                    {
                       status:true,
                       result:result
                    }
                )
            }
             
        }
    })
    }


}
