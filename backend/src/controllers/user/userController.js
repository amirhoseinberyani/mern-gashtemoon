const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Post = require("../../models/Post");
const path = require("path");
const SavePost = require("../../models/SavePost");
const jwt = require("jsonwebtoken");
var fs = require("fs");
const ChangeRole = require("../../models/ChangeRole");
const LeaderFeature = require("../../models/LeaderFeature");
// const sharp = require("sharp");

exports.getUserInfo = function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var lang = req.lang;
  var { id } = req.query;
  var isFollowed = false;

  try {
    User.findById(id ? id : user._id)
      .populate("education gender")
      .populate(
        {
          path: "visiteds",
          populate: { path: "attractionType" },

        })
      .populate(
        {
          path: "wishVisits",
          populate: { path: "attractionType" },

        })
      .exec((err, findedUser) => {
        if (err) {
          return res
            .status(500)
            .json({ message: serverErrorMessage, err: err });
        }
        if (user.followings.includes(id)) {
          isFollowed = true;
        }
        return res
          .status(200)
          .json({ data: findedUser, isFollowed, message: SuccessSave });
      });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.getLeaderInfo = function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;

  try {
    LeaderFeature.findOne()
      .where({ userId: user._id })
      .populate("cardLanguage")
      .exec((err, findedLeader) => {
        if (err) {
          return res
            .status(500)
            .json({ message: serverErrorMessage, err: err });
        }
        return res
          .status(200)
          .json({ data: findedLeader, message: SuccessSave });
      });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.GetMyFollowers = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Find user and populate followers
    const userData = await User.findById(user._id).populate("followers").select("followers");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let followersList = userData.followers;

    // Apply search filter if provided
    if (SearchQuery && SearchQuery !== "undefined") {
      followersList = followersList.filter(follower =>
        follower.name.toLowerCase().includes(SearchQuery.toLowerCase()) // Adjust field as needed
      );
    }

    const totalCount = followersList.length; // Total count after filtering

    // Apply pagination manually
    const paginatedFollowers = followersList.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Merged total count
      lists: paginatedFollowers, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};


exports.UploadPost = async function (req, res) {
  var { uploadSuccessMessage } = req.locale;
  const { authorization } = req.headers;
  const { location, oldCover } = req.body;
  const { userID } = jwt.verify(
    authorization || "",
    process.env.JWT_SECRET_KEY || ""
  );
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}${month}${year}`;

  try {
    // await sharp(req.file.path)
    //   .resize(200)
    //   .toFile(
    //     `./public/posts/${location}/${currentDate}/${userID}/${req.file.filename.split("_")[0]
    //     }_sm.png`
    //   );

    // await sharp(req.file.path)
    //   // .rotate(180)
    //   .resize(400)
    //   .toFile(
    //     `./public/posts/${location}/${currentDate}/${userID}/${req.file.filename.split("_")[0]
    //     }_md.png`
    //   );
    return res.status(200).json({
      path: `posts/${location}/${currentDate}/${userID}/${req.file.filename.split("_")[0]}`,
      message: uploadSuccessMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

exports.GetMyFollowings = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Find user and populate followings
    const userData = await User.findById(user._id).populate("followings").select("followings");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let followingsList = userData.followings;

    // Apply search filter if provided
    if (SearchQuery && SearchQuery !== "undefined") {
      followingsList = followingsList.filter(following =>
        following.name.toLowerCase().includes(SearchQuery.toLowerCase()) // Adjust field as needed
      );
    }

    const totalCount = followingsList.length; // Total count after filtering

    // Apply pagination manually
    const paginatedFollowings = followingsList.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Merged total count
      lists: paginatedFollowings, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};


exports.GetMyFavorites = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Fetch user with populated favorites
    const userData = await User.findById(user._id)
      .populate({
        path: "favorites",
        populate: { path: "attractionType provinceId countyId" },
      })
      .select("favorites");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let favoritesList = userData.favorites;

    // Apply search filter if provided
    if (SearchQuery && SearchQuery !== "undefined") {
      favoritesList = favoritesList.filter(favorite =>
        favorite.name.toLowerCase().includes(SearchQuery.toLowerCase()) // Adjust field as needed
      );
    }

    const totalCount = favoritesList.length; // Total count after filtering

    // Apply pagination manually
    const paginatedFavorites = favoritesList.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Total count after search filter
      currentPage: Page,
      pagesCount: Math.ceil(totalCount / ItemPerPage),
      pageSize: ItemPerPage,
      lists: paginatedFavorites, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};


exports.GetMyWishVisits = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Fetch user with populated wishVisits
    const userData = await User.findById(user._id)
      .populate({
        path: "wishVisits",
        populate: { path: "attractionType provinceId countyId" },
      })
      .select("wishVisits");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishVisitsList = userData.wishVisits;

    const totalCount = wishVisitsList.length; // Total count after filtering

    // Apply pagination manually
    const paginatedFavorites = wishVisitsList.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Total count after search filter
      currentPage: Page,
      pagesCount: Math.ceil(totalCount / ItemPerPage),
      pageSize: ItemPerPage,
      lists: paginatedFavorites, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};


exports.GetMyVisiteds = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Fetch user with populated favorites
    const userData = await User.findById(user._id)
      .populate({
        path: "visiteds",
        populate: { path: "attractionType provinceId countyId" },
      })
      .select("visiteds");
    console.log('userData', userData.visiteds)
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let visitedsList = userData.visiteds;

    const totalCount = visitedsList.length; // Total count after filtering

    // Apply pagination manually
    const paginatedVisiteds = visitedsList.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Total count after search filter
      currentPage: Page,
      pagesCount: Math.ceil(totalCount / ItemPerPage),
      pageSize: ItemPerPage,
      lists: paginatedVisiteds, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.GetMySaves = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const { user } = req;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10; // Default page size

  try {
    // Fetch saved posts with populated post details
    const savedPosts = await SavePost.find({ user: user._id }).populate("post");

    let filteredSaves = savedPosts;

    // Apply search filter if provided
    if (SearchQuery && SearchQuery !== "undefined") {
      filteredSaves = savedPosts.filter(save =>
        save.post.title.toLowerCase().includes(SearchQuery.toLowerCase()) // Adjust field as needed
      );
    }

    const totalCount = filteredSaves.length; // Total count after filtering

    // Apply pagination manually
    const paginatedSaves = filteredSaves.slice((Page - 1) * ItemPerPage, Page * ItemPerPage);

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalCount, // Total count after search filter
      currentPage: Page,
      pagesCount: Math.ceil(totalCount / ItemPerPage),
      pageSize: ItemPerPage,
      lists: paginatedSaves, // Paginated result
    });

  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};

exports.GetMyPosts = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  var { SearchQuery, page, pageSize } = req.query;
  const Page = page ? parseInt(page) : 1;
  const ItemPerPage = pageSize ? parseInt(pageSize) : 10;
  const { user } = req;
  var lang = req.lang;
  var conditions = { lang: lang, writer: user._id };

  if (SearchQuery && SearchQuery !== "undefined") {
    conditions.title = { $regex: ".*" + SearchQuery + ".*", $options: "i" };
  }

  try {
    const totalPosts = await Post.countDocuments(conditions); // Get total count
    const findedPosts = await Post.find(conditions)
      .limit(ItemPerPage)
      .skip((Page - 1) * ItemPerPage)
      .exec();

    return res.status(200).json({
      message: SuccessSave,
      totalCount: totalPosts, // Added total count
      pagesCount: Math.ceil(totalPosts / ItemPerPage),
      lists: findedPosts,
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
  }
};


exports.EditUser = function (req, res, next) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { user } = req;
  var { _id } = req.body;

  try {
    if (user._id.equals(_id)) {
      var {
        _id,
        email,
        firstName,
        lastName,
        job,
        defaultAvatar,
        phoneNumber,
        birthday,
        education,
        gender,
        profileUrl,
      } = req.body;
      User.findByIdAndUpdate(
        _id,
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          job: job,
          defaultAvatar: defaultAvatar,
          phoneNumber: phoneNumber,
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
    } else {
      return res.status(401).json({ message: serverErrorMessage });
    }
  } catch (e) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.EditLeader = function (req, res, next) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var { user } = req;
  var { _id } = req.body;
  var {
    userId,
    bio,
    cardType,
    managedCities,
    cardLanguage,
    scope,
    onQuoteDescription,
    workRecords,
    educationRecords,
    socials,
  } = req.body;

  try {
    if (user._id.equals(userId)) {
      LeaderFeature.findOneAndUpdate(
        { userId },
        {
          bio,
          cardType,
          cardLanguage,
          managedCities,
          scope,
          onQuoteDescription,
          workRecords,
          educationRecords,
          socials,
        },
        (err, doc) => {
          console.log('docdoc', doc)
          if (err) {
            return res
              .status(500)
              .json({ message: serverErrorMessage, err: err });
          }
          if (doc !== null) {
            return res.status(200).json({ message: SuccessSave });
          }
          else {
            var newLeaderFeature = new LeaderFeature(req.body);
            newLeaderFeature.save((err) => {
              if (err) {
                return res.status(500).json({ message: err });
              }
              return res.status(200).json({ message: SuccessSave });
            });
          }
        }
      );
    } else {
      return res.status(401).json({ message: serverErrorMessage });
    }
  } catch (e) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.changeRoleRequest = function (req, res) {
  const { serverErrorMessage, SuccessSave, RequestExists } = req.locale;
  const { user } = req;
  const { role,
    phoneNumber,
    cardNumber,
    nationalCode,
  } = req.body;

  try {
    ChangeRole.find({ userId: user._id }, (err, findedRequest) => {
      if (err) {
        return res.status(500).json({ message: serverErrorMessage, err: err });
      }
      if (findedRequest.length > 0) {
        return res.status(400).json({ message: RequestExists });
      }
      let newChangeRoleRequest = new ChangeRole({
        userId: user._id,
        role,
        cardNumber,
        phoneNumber,
        nationalCode,
      });
      newChangeRoleRequest.save((err, savedComment) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        return res
          .status(200)
          .json({ savedComment: savedComment, message: SuccessSave });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: serverErrorMessage, err: err });
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
