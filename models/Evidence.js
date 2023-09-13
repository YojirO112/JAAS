const mongoose = require("mongoose");
const OnCase = require("./case")

mongoose.connect('mongodb://127.0.0.1:27017/JAAS')
    .then(d=>console.log("Evidence Connection Secured"))
    .catch(err=> console.log("Evidence Connection Error"));

const Evidence_Schema = mongoose.Schema({
    Images : [
        {
            url : String,
            filename : String
        }
    ],

    Belongings : {
        type : String,
        enum : ["Respondent","Petioner"]
    },

    Details : String,

    Case : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "OnCase"
    }
})

const Evidence = new mongoose.model("Evidence",Evidence_Schema);

module.exports=Evidence;