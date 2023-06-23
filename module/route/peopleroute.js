const express = require("express")
const router = new express.Router()
const people = require("../controller/peopleController")

router.post("/add", people.addPeople);
router.get("/", people.getPeople);
router.get("/:id", people.getbyId)
router.put("/:id", people.updatePeople);
router.delete("/:id", people.deletePeople);

module.exports = router