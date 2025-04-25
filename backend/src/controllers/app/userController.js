const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../../models/Post");
// const sharp = require("sharp");
const path = require("path");
const LeaderFeature = require("../../models/LeaderFeature");

exports.SignIn = function (req, res, next) {
  var { serverErrorMessage, SuccessSave, userNotExist } = req.locale;
  try {
    var { email, password } = req.body;
    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      if (doc === null) {
        return res.status(404).json({ message: userNotExist });
      }
      bcrypt.compare(password, doc.password, (err, same) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        if (!same) {
          return res.status(404).json({ message: userNotExist });
        }
        const token = jwt.sign(
          { userID: doc._id, date: new Date() },
          process.env.JWT_SECRET_KEY
        );
        doc.tokens = [...doc.tokens, token];
        doc.save((err) => {
          if (err) {
            return res.status(500).json({ message: serverErrorMessage });
          }
          res
            .status(200)
            .json({ token: token, role: doc.role, message: SuccessSave });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.SignUp = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    // get request body
    var { firstName, lastName, defaultAvatar, email, password, profileUrl } =
      req.body;

    // check user exist
    User.findOne({ email: email }, (err, userExisted) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      if (userExisted) {
        return res.status(400).json({ message: "user exists" });
      }

      // hash password
      bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }

        // save user
        var newUser = new User({
          firstName,
          lastName,
          defaultAvatar,
          email,
          password: hash,
          profileUrl,
        });
        newUser.save((err, savedUser) => {
          if (err) {
            return res.status(500).json({ message: serverErrorMessage, err: err });
          }
          //create token
          const token = jwt.sign(
            { userID: savedUser._id, date: new Date() },
            process.env.JWT_SECRET_KEY
          );
          savedUser.tokens = [...savedUser.tokens, token];

          savedUser.save((err) => {
            if (err) {
              return res.status(500).json({ message: serverErrorMessage });
            }
            return res.status(200).json({ token: token, message: SuccessSave });
          });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.UploadUserProfile = function (req, res) {
  var { uploadSuccessMessage } = req.locale;
  var path = req.file.filename;
  return res.status(200).json({
    path: "users/" + path,
    message: uploadSuccessMessage,
  });
};

exports.UploadStatics = function (req, res) {
  var { uploadSuccessMessage } = req.locale;
  var path = req.file.filename;
  return res.status(200).json({
    path: "statics/" + path,
    message: uploadSuccessMessage,
  });
};

exports.Upload = function (req, res) {
  var { uploadSuccessMessage } = req.locale;

  sharp(req.file.path)
    .rotate(180)
    .resize(200)
    .toFile(`./public/posts/${req.file.originalname}`)
    // }_sm${path.extname(req.file.originalname)}`
    .then((info) => {
      console.log("info:", req.file);
      return res.status(200).json({
        path: "..",
        message: uploadSuccessMessage,
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// exports.Upload = function (req, res) {
//   var { serverErrorMessage, uploadSuccessMessage } = req.locale;
//   try {
//     var { file } = req.files;
//     console.log(file);
//     var path = "/" + Date.now() + "/" + file.name;
//     file.mv("../.." + path, (err) => {
//       if (err) {
//         return res.status(500).json({ message: err });
//       }
//       return res.status(200).json({
//         path: "../.." + path,
//         message: uploadSuccessMessage,
//       });
//     });
//   } catch (error) {
//     return res.status(500).json({ message: serverErrorMessage, error: error });
//   }
// };

exports.getUserInfo = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { id } = req.query;

  try {
    User.findById(id, (err, findedUser) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      return res.status(200).json({ data: findedUser, message: SuccessSave });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.getUserAttractions = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { id } = req.query;

  try {
    User.findById(id)
      .populate({
        path: "relatedAttractions",
        populate: { path: "attractionType provinceId countyId" },
      })
      .select("relatedAttractions")
      .exec((err, findedUser) => {
        if (err) {
          return res
            .status(500)
            .json({ message: serverErrorMessage, err: err });
        }
        return res
          .status(200)
          .json({ data: findedUser.relatedAttractions, message: SuccessSave });
      });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.getUserPosts = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { id } = req.query;

  try {
    Post.find({ writer: id, type: "post" }).exec((err, findedUser) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      return res.status(200).json({ data: findedUser, message: SuccessSave });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.GetAllLeadersOld = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { sort, leaderType, language, gender, audience, ages } = req.query;
  var lang = req.lang;
  var conditions = {
    lang: lang,
    role: { $in: [2, 3] },
  };
  var sortItem = null;

  if (
    !(
      leaderType == undefined ||
      leaderType == "undefined" ||
      leaderType == null ||
      leaderType == "" ||
      leaderType == "null"
    )
  ) {
    conditions.role = leaderType;
  }
  if (
    !(
      language == undefined ||
      language == "undefined" ||
      language == null ||
      language == "" ||
      language == "null"
    )
  ) {
    conditions.language = language;
  }

  if (!(gender == undefined || gender == "undefined" || gender == null)) {
    conditions.gender = gender;
  }
  if (
    !(
      ages == undefined ||
      ages == "undefined" ||
      ages == null
    )
  ) {
    conditions.ages = ages;
  }
  if (
    !(
      audience == undefined ||
      audience == "undefined" ||
      audience == null
    )
  ) {
    conditions.audience = audience;
  }

  if (sort === "like") {
    sortItem = { "rate.rate": -1 };
  }
  if (sort === "newest") {
    sortItem = { createdAt: -1 };
  }
  if (sort === "youngest") {
    sortItem = { usersSuggest: -1 };
  }

  User.find()
    .where(conditions)
    .sort(sortItem)
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      return res.status(200).json({ lists: doc, message: SuccessSave });
    });
};

exports.GetAllLeaders = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { sort, leaderType, language, gender, audience, userId, isFollowed, followedOnly } = req.query;
  let { ages } = req.query;
  const lang = req.lang;

  try {
    let conditions = {
      lang: lang,
      role: { $in: [2, 3] },
    };

    // Apply filters based on query parameters
    if (leaderType && leaderType !== "null" && leaderType !== "undefined") {
      conditions.role = leaderType;
    }

    if (language && language !== "null" && language !== "undefined") {
      conditions.language = language;
    }

    if (gender && gender !== "undefined") {
      conditions.gender = gender;
    }

    if (audience && audience !== "undefined") {
      conditions.audience = audience;
    }

    // Age filtering based on birthday string (format "YYYY-MM-DD")
    if (ages) {
      if (typeof ages === "string") {
        ages = ages.split(",").map(Number);
      }
      if (Array.isArray(ages) && ages.length === 2) {
        const [minAge, maxAge] = ages;
        const currentYear = new Date().getFullYear();
        const maxBirthYear = currentYear - minAge;
        const minBirthYear = currentYear - maxAge;

        const minBirthDate = new Date(`${minBirthYear}-01-01`);
        const maxBirthDate = new Date(`${maxBirthYear}-12-31`);

        conditions.birthday = {
          $gte: minBirthDate.toISOString().split("T")[0],
          $lte: maxBirthDate.toISOString().split("T")[0],
        };
      }
    }

    // Sorting logic
    let sortItem = {};
    if (sort === "like") sortItem = { "rate.rate": -1 };
    else if (sort === "newest") sortItem = { createdAt: -1 };
    else if (sort === "youngest") sortItem = { usersSuggest: -1 };

    // Fetch leaders based on the conditions
    let leaders = await User.find(conditions).sort(sortItem).lean();

    let followedIds = [];
    if (userId) {
      const user = await User.findById(userId).lean();
      if (user && user.followings) {
        followedIds = user.followings.map((id) => id.toString());
      }

      // If 'followedOnly' is true, filter leaders to only those the user is following
      if (followedOnly === "true") {
        leaders = leaders.filter((leader) => followedIds.includes(leader._id.toString()));
      }

      // If 'isFollowed' is true, also filter to only show followed leaders
      if (isFollowed === "true") {
        leaders = leaders.filter((leader) => followedIds.includes(leader._id.toString()));
      }
    }

    // Fetch bios from LeaderFeature
    const leaderIds = leaders.map((l) => l._id);
    const bios = await LeaderFeature.find({ _id: { $in: leaderIds } }).lean();
    const bioMap = {};
    bios.forEach((b) => (bioMap[b._id.toString()] = b.bio || ""));

    // Count the posts for each leader
    const postCounts = await Post.aggregate([
      { $match: { writer: { $in: leaderIds } } },
      { $group: { _id: "$writer", count: { $sum: 1 } } },
    ]);
    const postCountMap = {};
    postCounts.forEach((p) => (postCountMap[p._id.toString()] = p.count));

    // Construct the final result
    const result = leaders.map((leader) => {
      const leaderIdStr = leader._id ? leader._id.toString() : null;
      return {
        ...leader,
        isFollowed: userId && leaderIdStr && followedIds.includes(leaderIdStr),
        bio: leaderIdStr && bioMap[leaderIdStr] ? bioMap[leaderIdStr] : "",
        postsCount: leaderIdStr && postCountMap[leaderIdStr] ? postCountMap[leaderIdStr] : 0,
      };
    });

    return res.status(200).json({ lists: result, message: SuccessSave });

  } catch (err) {
    console.error("Error in GetAllLeaders:", err);
    return res.status(500).json({ message: serverErrorMessage, error: err.message });
  }
};