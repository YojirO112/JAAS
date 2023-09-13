const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/JAAS')
    .then(d=>console.log("Algo Connection Secured"))
    .catch(err=> console.log("Algo Connection Error"));

const Algo_Schema = new mongoose.Schema({
    Priority : {
        type : String,
        enum : ["Quick - High Priority","Slow - Low Priority"]
    },

    Extention_No : {
        type : Number,
        default : 0
    },

    Extended : {
        type : Boolean
    }
})

const Algo = mongoose.model("Algo",Algo_Schema);
module.exports=Algo;