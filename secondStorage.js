const express = require("express")
const fs = require('fs')
const SignUp =  express.Router()
 
SignUp.post("/", (req, res) => {
    const body = req.body
    const users = JSON.parse(fs.readFileSync('users.json'))
    users.push(body)
    fs.writeFileSync('users.json', JSON.stringify(users))
})
 
module.exports =  SignUp
 
 
const response = await db.collection("users").insertOne(user)
 
 
const response = await db.collection("users").insertOne({ name, email, password });