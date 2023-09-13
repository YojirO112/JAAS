const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/JAAS')
    .then(d=>console.log("Evidence Connection Secured"))
    .catch(err=> console.log("Evidence Connection Error"));

const Evidence_Schema = mongoose.Schema({
    Images : [
        {
            url : String,
            filename : String
        }
    ]
})

const Evidence = new mongoose.model("Evidence",Evidence_Schema);

module.exports=Evidence