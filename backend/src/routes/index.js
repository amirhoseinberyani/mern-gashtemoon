const express = require("express");

const Router = express.Router();
const CheckUser = require("../middlewares/checkUser");
const CheckAdmin = require("../middlewares/checkAdmin");
const CheckUserActive = require("../middlewares/checkUserActive");

// config admin router
const AdminRouter = require("./admin");
Router.use("/admin", CheckUser, CheckAdmin, AdminRouter);

// // config user router
const UserRouter = require("./user");
Router.use("/user", CheckUserActive, UserRouter);

// // config app router
const AppRouter = require("./app");
Router.use("/app", AppRouter);

module.exports = Router;
