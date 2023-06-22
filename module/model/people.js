const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    age:{
        type: String,
        required : true
    },
    address:{
        type: String,
        required: true
    }
})

const People = mongoose.model("People", peopleSchema);

module.exports = People;