const express = require("express");
const router = new express.Router();
const people = require("../controller/peopleController");
const adminAuth = require("../middleware/requireAuth");
const userAuth = require("../middleware/userAuth");

router.use(adminAuth); 
router.get("/", people.getPeople); 
router.post("/add", people.addPeople); 
router.get("/:name", people.getbyUsername); 
router.put("/:id", people.updatePeople); 
router.delete("/:id", people.deletePeople); 

module.exports = router;
