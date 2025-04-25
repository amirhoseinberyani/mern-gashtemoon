const Post = require("../../models/Post");
const { default: Tag } = require("../../models/Tag");
const User = require("../../models/User");

exports.GetAttractionLeaderPosts = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var { attractionId, userId } = req.query;
    var lang = req.lang;
    const ItemPerPage = 5;
    var conditions = { lang: lang, writer: userId };

    if (!(attractionId == undefined || attractionId == "")) {
      conditions.attraction = attractionId;
    }
    Post.find()
      .where(conditions)
      .populate("writer")
      // .select("type title image updatedAt")
      // .sort({ createdAt: -1 })
      // .limit(ItemPerPage)
      // .skip((page - 1) * ItemPerPage)
      .exec((err, docs) => {
        if (err) {
          return res
            .status(500)
            .json({ message: serverErrorMessage, err: err });
        }
        Post.countDocuments(conditions, (err, count) => {
          if (err) {
            return res
              .status(500)
              .json({ message: serverErrorMessage, err: err });
          }
          res.status(200).json({
            lists: docs,
            pagesCount: Math.ceil(count / ItemPerPage),
            message: SuccessSave,
          });
        });
      });
  } catch (e) {
    return res.status(401).json({ message: serverErrorMessage });
  }
};

exports.GetLatestPosts = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var { page, title } = req.query;
    var lang = req.lang;
    const ItemPerPage = 5;
    var conditions = { lang: lang };
    if (!(title == undefined || title == "")) {
      conditions.title = { $regex: new RegExp(title, "i") };
    }
    Post.find()
      // .where(conditions)
      // .select("type title image updatedAt type")
      .populate("writer")
      .sort({ createdAt: -1 })
      .limit(ItemPerPage)
      // .skip((page - 1) * ItemPerPage)
      .exec((err, docs) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        Post.countDocuments(conditions, (err, count) => {
          if (err) {
            return res.status(401).json({ message: serverErrorMessage });
          }
          res.status(200).json({
            lists: docs,
            pagesCount: Math.ceil(count / ItemPerPage),
            message: SuccessSave,
          });
        });
      });
  } catch (e) {
    return res.status(401).json({ message: serverErrorMessage });
  }
};

exports.GetAllPosts = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var { pageSize, title, page, tags, attractionId } = req.query;
    var lang = req.lang;
    const Page = page ? parseInt(page) : 1;
    const ItemPerPage = pageSize ? parseInt(pageSize) : 10;

    var conditions = { lang: lang };

    if (title && title.trim() !== "") {
      conditions.title = { $regex: new RegExp(title, "i") };
    }

    // If attractionId is provided, filter by attractionId
    if (attractionId && attractionId!== 'null') {
      conditions.attraction = attractionId; // Assuming attraction is stored as an ObjectId reference
    }

    // If tags are provided, we need to get ObjectIds from the tag names
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");

      // Query the Tag collection to find the ObjectId for each tag
      Tag.find({ name: { $in: tagArray } }).exec((err, tagDocs) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage, error: err.message });
        }

        // Extract the ObjectId values
        const tagIds = tagDocs.map((tag) => tag._id);

        // Add the tags condition with ObjectIds
        conditions.tags = { $in: tagIds };

        // Now find the posts using these conditions
        Post.find(conditions)
          .populate("writer attraction")
          .sort({ createdAt: -1 })
          .limit(ItemPerPage)
          .skip((Page - 1) * ItemPerPage)
          .exec((err, docs) => {
            if (err) {
              return res.status(500).json({ message: serverErrorMessage, error: err.message });
            }

            Post.countDocuments(conditions, (err, count) => {
              if (err) {
                return res.status(401).json({ message: serverErrorMessage, error: err.message });
              }

              res.status(200).json({
                lists: docs,
                pagesCount: Math.ceil(count / ItemPerPage),
                message: SuccessSave,
              });
            });
          });
      });
    } else {
      // If no tags, just fetch posts normally
      Post.find(conditions)
        .populate("writer attraction")
        .sort({ createdAt: -1 })
        .limit(ItemPerPage)
        .skip((Page - 1) * ItemPerPage)
        .exec((err, docs) => {
          if (err) {
            return res.status(500).json({ message: serverErrorMessage, error: err.message });
          }

          Post.countDocuments(conditions, (err, count) => {
            if (err) {
              return res.status(401).json({ message: serverErrorMessage, error: err.message });
            }

            res.status(200).json({
              lists: docs,
              pagesCount: Math.ceil(count / ItemPerPage),
              message: SuccessSave,
            });
          });
        });
    }
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ message: serverErrorMessage, error: e.message });
  }
};

exports.GetFilteredPosts = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  try {
    const {
      pageSize,
      title,
      page,
      tags,
      attractionId,
      userId,
      followingsOnly, // use followingsOnly=true to get only followed leaders' posts
    } = req.query;

    const lang = req.lang;
    const Page = page ? parseInt(page) : 1;
    const ItemPerPage = pageSize ? parseInt(pageSize) : 10;

    let conditions = { lang };

    // 🔍 Filter by title
    if (title && title.trim() !== "") {
      conditions.title = { $regex: new RegExp(title, "i") };
    }

    // 📍 Filter by attraction
    if (attractionId && attractionId !== "null") {
      conditions.attraction = attractionId;
    }

    // 🧍‍♂️ Filter by followed leaders (if requested)
    if (followingsOnly === "true" && userId) {
      const user = await User.findById(userId).select("followings");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      conditions.writer = { $in: user.followings };
    }

    // 🏷️ Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      const tagDocs = await Tag.find({ name: { $in: tagArray } });
      const tagIds = tagDocs.map((tag) => tag._id);
      conditions.tags = { $in: tagIds };
    }

    // 🧾 Fetch posts
    const posts = await Post.find(conditions)
      .populate("writer attraction")
      .sort({ createdAt: -1 })
      .limit(ItemPerPage)
      .skip((Page - 1) * ItemPerPage);

    const count = await Post.countDocuments(conditions);

    res.status(200).json({
      lists: posts,
      pagesCount: Math.ceil(count / ItemPerPage),
      message: SuccessSave,
    });

  } catch (error) {
    console.error("Error in GetFilteredPosts:", error);
    res.status(500).json({ message: serverErrorMessage, error: error.message });
  }
};


exports.GetPosts = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  var lang = req.lang;

  var conditions = { lang: lang };

  try {
    var lang = req.lang;
    Post.find()
      .where(conditions)
      .populate("writer")
      .exec((err, result) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        res.status(200).json({ posts: result, message: SuccessSave });
      });
  } catch (error) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.GetOnePost = function (req, res) {
  var { serverErrorMessage, SuccessSave } = req.locale;
  try {
    var { id } = req.query;
    Post.findById(id)
      .populate("attraction tags")
      .populate("writer")
      .exec((err, result) => {
        if (err) {
          return res.status(500).json({ message: serverErrorMessage });
        }
        let commentsCount = result.comments.length;
        let likesCount = result.usersLike.length;
        let savesCount = result.usersSave.length;
        res.status(200).json({
          post: {
            result,
            commentsCount: commentsCount,
            likesCount: result.usersLike.length,
            savesCount: result.usersSave.length,
          },
          message: SuccessSave,
        });
      });
  } catch (error) {
    return res.status(500).json({ message: serverErrorMessage });
  }
};

exports.GetAllPostTags = async function (req, res) {
  const { serverErrorMessage, SuccessSave } = req.locale;
  const length = parseInt(req.query.length) || 10;

  try {
    const tags = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tagInfo"
        }
      },
      { $unwind: "$tagInfo" },
      {
        $project: {
          _id: 1,
          count: 1,
          name: "$tagInfo.name"
        }
      },
      { $limit: length }
    ]);

    return res.status(200).json({
      tags,
      message: SuccessSave
    });
  } catch (error) {
    console.error("Error fetching post tags:", error);
    return res.status(500).json({ message: serverErrorMessage });
  }
};
