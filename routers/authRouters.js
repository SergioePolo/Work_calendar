const express = require("express")
const router = express.Router()
const {authUser, userApproved} = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authUser)

router.get("/",authMiddleware, userApproved)

module.exports = router