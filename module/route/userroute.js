const express = require("express")
const router = new express.Router()
const user = require("../controller/userController")

router.post("/signup", user.regUser)
router.post("/login", user.loginUser)

module.exports = router