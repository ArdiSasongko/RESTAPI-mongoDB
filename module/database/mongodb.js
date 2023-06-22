const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch((error)=>{
        console.log("Error Connecting to Database" + error)
    })
}

connectDB();