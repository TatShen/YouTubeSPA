const express = require("express")
const router = express.Router()
const {validateBodyUser} = require("./validate")
const authenticateToken = require("../middleware/authMiddleware")
const userControllers = require("../controllers/userControllers")

router.post("/registration", validateBodyUser, userControllers.registration)

router.post("/login",validateBodyUser,  userControllers.login)

router.get("/", authenticateToken, userControllers.getUser)

module.exports = router