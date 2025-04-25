const ChangeRole = require("../../models/ChangeRole");
const LeaderFeature = require("../../models/LeaderFeature");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

exports.GetAllUsers = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;

  var { id } = req.query;
  var conditions = {};
  if (id) {
    conditions._id = id;
  }

  User.find()
    .where(conditions)
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      return res.status(200).json({ lists: doc, message: SuccessSave });
    });
};

exports.DeleteUser = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var { id } = req.query;
    User.findByIdAndRemove(id, (err) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      res.status(200).json({ message: SuccessSave });
    });
  } catch (error) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.SetAdmin = function (req, res) {
  var { _id } = req.query;
  User.findByIdAndUpdate(_id, { role: 1 }, (err) => { });
};

exports.ToggleActivity = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { user } = req;
  var { userId, isActive } = req.body;

  try {
    User.findByIdAndUpdate(userId, { isActive: !isActive }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      return res.status(200).json({ data: user, message: SuccessSave });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.ChangeRole = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { user } = req;
  var { id, userId, role, cardNumber } = req.body;

  console.log('req.body', req.body)

  try {
    User.findByIdAndUpdate(userId, { role: role }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      var newLeaderFeature = new LeaderFeature({ userId, cardNumber });
      newLeaderFeature.save((err) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        ChangeRole.findByIdAndDelete(id, (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: serverErrorMessage, err: err });
          }
          return res.status(200).json({ data: user, message: SuccessSave });
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.GetAllChangeRoleRequests = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;

  ChangeRole.find()
    // .where(conditions)
    .populate("userId")
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      return res.status(200).json({ lists: doc, message: SuccessSave });
    });
};

exports.DenyChangeRole = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { user } = req;
  var { id } = req.query;

  try {
    ChangeRole.findByIdAndDelete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      return res.status(200).json({ data: user, message: SuccessSave });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.EditUser = function (req, res, next) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { _id, email, firstName, lastName, job, bio } = req.body;
  var { education, gender, profileUrl } = req.body;
  var { phoneNumber, password, onQuoteDescription, birthday, defaultAvatar } = req.body;

  try {
    if (password) {
      // hash password
      bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        User.findByIdAndUpdate(
          _id,
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            job: job,
            bio: bio,
            defaultAvatar: defaultAvatar,
            password: hash,
            phoneNumber: phoneNumber,
            onQuoteDescription: onQuoteDescription,
            birthday: birthday,
            education: education,
            gender: gender,
            profileUrl: profileUrl,
          },
          (err, doc) => {
            if (err) {
              return res
                .status(500)
                .json({ message: serverErrorMessage, err: err });
            }
            return res.status(200).json({ message: SuccessSave });
          }
        );
      });
    } else {
      User.findByIdAndUpdate(
        _id,
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          job: job,
          bio: bio,
          phoneNumber: phoneNumber,
          defaultAvatar: defaultAvatar,
          onQuoteDescription: onQuoteDescription,
          birthday: birthday,
          education: education,
          gender: gender,
          profileUrl: profileUrl,
        },
        (err, doc) => {
          if (err) {
            return res
              .status(500)
              .json({ message: serverErrorMessage, err: err });
          }
          return res.status(200).json({ message: SuccessSave });
        }
      );
    }
  } catch (e) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.GetMyChangeRoleRequests = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;

  ChangeRole.findOne()
    .where({ userId: user._id })
    .populate("userId")
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage });
      }
      if (doc !== null) {
        return res
          .status(200)
          .json({ state: "Requested", message: SuccessSave });
      }
      return res
        .status(200)
        .json({ state: "Unrequested", message: SuccessSave });
    });
};
