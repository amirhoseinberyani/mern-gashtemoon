const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavePostSchema = new Schema(
  {
    post: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    lang: { type: String, default: "fa" },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);
const SavePost = mongoose.model("SavePost", SavePostSchema);
module.exports = SavePost;
