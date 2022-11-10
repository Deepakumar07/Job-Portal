const router=require("express").Router();

const login_schema=require('../controller/login-controller');

const joblist_controller=require('../controller/joblist-controller');

const appliedjob_controller=require("../controller/applyJob-controller")
// getlogin details

router.post("/addloginvalues",login_schema.addloginvalues);
router.get("/getloginvalues",login_schema.getloginvalues);
router.delete("/deleteLoginUser",login_schema.deleteLoginUser);
router.post("/loginprocess",login_schema.loginProcess);
router.post("/getuserloginvalues",login_schema.getuserloginvalues);
router.put("/updateAccount", login_schema.UpdateAccount);


// getjoblist details

router.post("/addNewJob",joblist_controller.addNewJob);
router.get("/getAllJoblist",joblist_controller.getAllJoblist);
router.post("/getParticulrJob", joblist_controller.getParticulrJob);    
router.delete("/deletejob",joblist_controller.deletejob);
// router.get("/getfeaturedjobs",joblist_controller.getfeaturedjobs);
// router.post("/getsearchedJob",joblist_controller.getsearchedJob);
router.put("/updatejob",joblist_controller.updatejob);


router.post("/applyJob", appliedjob_controller.applyJob);

module.exports=router;