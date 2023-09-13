const mongoose = require("mongoose");
const Schedule = require("./Schedule")
const Algo = require("./Algo")

mongoose.connect('mongodb://127.0.0.1:27017/JAAS')
    .then(d=>console.log("Case Connection Secured"))
    .catch(err=> console.log("Case Connection Error"));

const OnCase_Schema = new mongoose.Schema({
    Name : {
        type : String
    },
    
    Crime : {
        type : String,
        enum : ["Civil","Criminal"]
    },

    Status : {
        type : String,
        enum : ["Active","Complete"]
    },

    Hearing : {
        type : Number,
        default : 0
    },

    Petioner : {
        type : String
    },

    Respondent : {
        type : String
    },

    Case_Type : {
        type : String
    },

    Next_Hearing : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Schedule"
    },

    Algo_data : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Algo"
    },

    Evidence : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Evidence"
        }
    ]
})

const OnCase = mongoose.model("OnCase",OnCase_Schema);
module.exports = OnCase;