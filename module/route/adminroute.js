const express = require("express")
const router = new express.Router()
const admin = require("../controller/adminController")

router.post("/register", admin.regAdmin)
router.post("/login", admin.loginAdmin)

module.exports = router