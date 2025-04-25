const express = require("express");
const multer = require("multer");
var fs = require("fs");

const AppRouter = express.Router();

// config Routes
const SiteController = require("../../controllers/app/siteController");
const UserController = require("../../controllers/app/userController");
const ProvinceController = require("../../controllers/app/provinceController");
const LoginValidator = require("../../validations/loginValidate");
const path = require("path");

var profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/users`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Post Method
AppRouter.post("/signin", UserController.SignIn);
AppRouter.post("/signup", LoginValidator.ValidateSignUp, UserController.SignUp);

AppRouter.post(
  "/upload-user-profile",
  multer({
    storage: profileStorage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if (
        ext.toLocaleLowerCase() !== ".png" &&
        ext.toLocaleLowerCase() !== ".jpg" &&
        ext.toLocaleLowerCase() !== ".jpeg" &&
        ext.toLocaleLowerCase() !== ".webp"
      ) {
        return callback(null, false);
      }
      callback(null, true);
    },
  }).single("user-profile"),
  UserController.UploadUserProfile
);

// GET Method
AppRouter.get("/", SiteController.GetSite);
AppRouter.get("/provinces", ProvinceController.getProvinces);
AppRouter.get("/get-statistics", SiteController.GetStatistics);

module.exports = AppRouter;
