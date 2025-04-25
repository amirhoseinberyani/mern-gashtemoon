var jwt = require("jsonwebtoken");
var User = require("../models/User");

function CheckAdmin(req, res, next) {
  if (req.user.role === 0) {
    next();
  } else {
    return res.status(401).json({});
  }
}
module.exports = CheckAdmin;
