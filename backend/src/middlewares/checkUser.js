var jwt = require("jsonwebtoken");
var User = require("../models/User");

function CheckUser(req, res, next) {
  var token = req.headers.authorization;
  var { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  User.findById(userID)
    .populate("education gender")
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({});
      }
      if (doc === null) {
        return res.status(401).json({});
      }
      if (doc.tokens.includes(token)) {
        req.user = doc;
        next();
      } else {
        return res.status(401).json({});
      }
    });
}
module.exports = CheckUser;
