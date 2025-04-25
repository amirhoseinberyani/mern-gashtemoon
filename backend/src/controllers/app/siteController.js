const Post = require("../../models/Post");
const Attraction = require("../../models/Attraction");
const WebSite = require("../../models/WebSite");
const User = require("../../models/User");

exports.GetSite = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var lang = req.lang;
    WebSite.findOne({ lang: lang }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      res.status(200).json({ site: result, message: SuccessSave });
    });
  } catch (error) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.GetStatistics = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var lang = req.lang;
  var conditions = { lang: lang };

  try {
    var data = {};
    Post.countDocuments(conditions, (err, postCount) => {
      if (err) {
        return res.status(401).json({ message: serverErrorMessage });
      }
      data.postCount = postCount;
      User.countDocuments({ role: { $in: [2, 3] } }, (err, userCount) => {
        if (err) {
          return res.status(401).json({ message: serverErrorMessage });
        }
        data.userCount = userCount;
        Attraction.countDocuments(conditions, (err, attractionCount) => {
          if (err) {
            return res.status(401).json({ message: serverErrorMessage });
          }
          data.attractionCount = attractionCount;
          return res
            .status(200)
            .json({ result: data, message: SuccessSave });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};
