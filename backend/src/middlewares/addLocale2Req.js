const en = require("../localization/en");
const fa = require("../localization/fa");
const du = require("../localization/du");

module.exports = function (req, res, next) {
  var lang = req.headers.localization;
  req.locale = lang === "fa" ? fa : lang === "du" ? du : en;
  req.lang = lang;
  next();
};
