const express = require("express");
const router = express.Router();

const Case = require("../models/case")
const Algo = require("../models/Algo")
const Schedule = require("../models/Schedule");
const Evidence = require("../models/Evidence");

const dayjs = require("dayjs");
const multer = require("multer")
const {storage} = require("../cloudinary/cloud")

const upload = multer({storage})

router.get("/evidence/:id", async(req,res)=>{ //show
    const find_Evidence_Res = await Evidence.find({Case : req.params.id , Belongings : "Respondent" });
    const find_Evidence_Pet = await Evidence.find({Case : req.params.id , Belongings : "Petioner" });
    const find_case = await Case.findById(req.params.id);
    console.log(find_Evidence_Pet);
    console.log(find_Evidence_Res);
    if(find_Evidence_Res.length===0 && find_Evidence_Pet.length===0){
        const msg="empty"
        return res.render("ShowEvidence",{find_Evidence_Res,msg,find_Evidence_Pet,find_case})
    }
    const msg = "";
    return res.render("ShowEvidence",{find_Evidence_Res,msg,find_Evidence_Pet,find_case})
})

router.get("/evidence/:id/new",async(req,res)=>{
    const find_case = await Case.findById(req.params.id);
    res.render("AddEvidence",{find_case});
})

router.post("/evidence/:id/post", upload.array("img"), async(req,res)=>{
    const find_case = await Case.findById(req.params.id);
    const new_evidence = new Evidence({
        Belongings : req.body.Belongings,
        Details : req.body.Details
    })
    req.files[0].path && new_evidence.Images.push({url : req.files[0].path , filename : req.files[0].filename})
    new_evidence.Case=find_case
    await new_evidence.save();
    res.redirect("/event")
})

router.get("/Schedule", async(req,res)=>{
    const find_case = await Case.find({}).populate("Next_Hearing");
    res.render("listings",{find_case});
})

router.get("/Calandar", async(req,res)=>{
    res.render("calandar")
})

router.get("/", async(req,res)=>{
    const cases = await Case.find({}).limit(10);
    res.render("home",{cases});
})

router.get("/create",(req,res)=>{
    res.render("create");
})

router.post("/create/case", async(req,res)=>{
    const new_case = new Case({
        Name : req.body.Name,
        Crime : req.body.Crime
    });

    const new_case_algo = new Algo({ Priority : req.body.Priority });

    const new_case_schedule = new Schedule({ 
        Room : req.body.Room,
        Date : req.body.date,
        Start : req.body.time
    });

    new_case.Next_Hearing = new_case_schedule;
    new_case.Algo_data = new_case_algo;


    await new_case.save()
    await new_case_algo.save()
    await new_case_schedule.save()
    res.redirect("/event")
})

router.get("/:id", async(req,res)=>{
    const find_case = await Case.findById(req.params.id).populate("Algo_data")
    res.render("show",{find_case});
})


module.exports=router;