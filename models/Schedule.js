const dayjs = require("dayjs");
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/JAAS')
    .then(d=>console.log("Schedule Connection Secured"))
    .catch(err=> console.log("Schedule Connection Error"));

const Schedule_Schema = new mongoose.Schema({
    Date : {
        type : String,
    },

    Start : {
        type : String
    },

    End : {
        type : String
    },

    Room : {
        type : Number,
        enum : [1,2,3]
    }
    
})

const Schedule = mongoose.model("Schedule",Schedule_Schema);
module.exports = Schedule;