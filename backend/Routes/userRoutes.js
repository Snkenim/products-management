const express = require("express")
const router = express.Router()
const controller = require("../Controller/userController")

router.post('/users', controller.createUser)

module.exports = router