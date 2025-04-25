const express = require("express");
const AdminRouter = express.Router();

const UserController = require("../../controllers/admin/userController");

// GET Routes
AdminRouter.get("/users", UserController.GetAllUsers);

// POST Routes
AdminRouter.post('/toggleActivity', UserController.ToggleActivity)

module.exports = AdminRouter;
