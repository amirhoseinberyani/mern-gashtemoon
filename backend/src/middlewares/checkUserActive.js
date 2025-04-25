var jwt = require("jsonwebtoken");
var User = require("../models/User");

function CheckUserActive(req, res, next) {
  var { InactiveUserError } = req.locale;
  var token = req.headers.authorization;
  var { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  User.findById(userID, (err, doc) => {
    if (err) {
      return res.status(500).json({});
    }
    if (doc === null) {
      return res.status(401).json({});
    }
    if (doc.tokens.includes(token)) {
      if (!doc.isActive) {
        return res.status(400).json({ message: InactiveUserError });
      }
      req.user = doc;
      next();
    } else {
      return res.status(401).json({});
    }
  });
}
module.exports = CheckUserActive;
