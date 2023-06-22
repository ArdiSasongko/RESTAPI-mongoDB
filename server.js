const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 8080

//router
const peopleroute = require("./module/route/peopleroute")
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

app.use("/people", peopleroute);

app.listen(PORT, () =>{
    console.log(`Server Running in http://localhost:${PORT}`)
})