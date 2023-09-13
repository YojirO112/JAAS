const express = require("express");
const app = express();
const path = require("path")
require("dotenv").config()

const Calendar = require("./routes/calandar")
const Event = require("./routes/Events")

app.use(express.urlencoded({extended : true}));

app.use("/google",Calendar);
app.use("/event",Event);


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.listen(3000,()=>{
    console.log("listening on port 3000")
})