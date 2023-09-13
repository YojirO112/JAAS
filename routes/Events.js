const express = require("express");
const router = express.Router();

const Case = require("../models/case")
const Algo = require("../models/Algo")
const Schedule = require("../models/Schedule");
const Evidence = require("../models/Evidence")
const dayjs = require("dayjs");

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
        Room : req.body.Room ,
        Date : req.body.date ,
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
    const find_case = await Case.findById(req.params.id).populate("Algo_data").populate("Evidence");
    res.render("show",{find_case});
})

router.get("/:id/Respondent/:EId", async(req,res)=>{
    const find_Evidence = await Evidence.findById(req.params.EId);
    const name = Respondent
    res.render("ShowEvidence",{find_Evidence,name})
})

router.get("/:id/Petioner/:EId", async(req,res)=>{
    const find_Evidence = await Evidence.findById(req.params.EId);
    const name = Petioner
    res.render("",{find_Evidence,name})
})


module.exports=router;