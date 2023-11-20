const express = require("express")
const router = express.Router()

const { showUsers,showUser, createUser, modifyUser, deleteUser } = require("../controllers/userController")

router.get("/", showUsers)

router.get("/:id", showUser)

router.post("/", createUser)

router.put("/:id",modifyUser)

router.delete("/:id",deleteUser)

module.exports = router