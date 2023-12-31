const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 8080

//router
const peopleroute = require("./module/route/peopleroute")
const peoplerouteuser = require("./module/route/peoplerouteuser")
const adminroute = require("./module/route/adminroute")
const userroute = require("./module/route/userroute")
const app = express()

dotenv.config()
require("./module/database/mongodb");

app.use(cors());

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/",(req,res)=>{
    console.log("Response Success")
    res.status(200).send("Response Success")
})

app.use("/admin/people", peopleroute);
app.use("/user/people", peoplerouteuser);
app.use("/admin", adminroute);
app.use("/user", userroute);

app.listen(PORT, () =>{
    console.log(`Server Running in http://localhost:${PORT}`)
})