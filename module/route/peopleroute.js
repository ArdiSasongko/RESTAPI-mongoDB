const express = require("express")
const router = new express.Router()
const people = require("../controller/peopleController")

router.post("/add", people.addPeople);
router.get("/", people.getPeople);

module.exports = router