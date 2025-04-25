const User = require("../models/User")

exports.ValidateSignUp = (req, res, next) => {
  var errors = [];
  var { email, password } = req.body;
  if (password.length < 6) {
    errors.push({
      key: "password",
      password: "password length must be more than 6",
    });
  }
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!emailRegex.test(email)) {
    errors.push({
      key: "email",
      password: "please enter valid email",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  User.findOne({ email: email }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "server Error", err });
    }
    if (doc !== null) {
      errors.push({
        key: "email",
        password: "email exists",
      });
      return res.status(400).json({ errors: errors });
    }
    next();
  });
};
