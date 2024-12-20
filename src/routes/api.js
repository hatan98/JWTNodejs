const express = require('express');
const { createUser, loginUser, getUser, getAccount } = require('../controllers/userController')
const routerAPI = express.Router();
const jwtAu = require('../middleware/jwt')
routerAPI.all("*", jwtAu)
routerAPI.get("/", (req, res) => {
    return res.status(200).json("hello world")
})
routerAPI.post("/register", createUser)
routerAPI.post("/login", loginUser)
routerAPI.get("/user", getUser)
routerAPI.get("/account", getAccount)
module.exports = routerAPI; //export default