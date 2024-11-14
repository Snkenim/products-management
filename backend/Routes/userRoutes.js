const express = require("express");
const router = express.Router();
const controller = require("../Controller/userController");

module.exports = (db) => {
    router.post('/', (req, res) => {
        controller.createUser(req, res, db)
    }); 
    return router;
};
