const express = require("express");
const router = new express.Router();
const people = require("../controller/peopleController");
const adminAuth = require("../middleware/requireAuth");
const userAuth = require("../middleware/userAuth");

router.use(userAuth); 
router.get("/", people.getPeople); 

module.exports = router;
