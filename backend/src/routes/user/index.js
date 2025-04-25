const express = require("express");
const UserRouter = express.Router();

// controllers
const UserController = require("../../controllers/user/userController");


// // GET Method
UserRouter.get("/userInfo", UserController.getUserInfo);

module.exports = UserRouter;