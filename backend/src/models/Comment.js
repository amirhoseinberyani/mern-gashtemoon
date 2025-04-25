const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    name: String,
    email: String,
    type: String,
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    attractionRate: Number,
    attractionSuggest: Boolean,
    childs: { type: [{ type: Schema.Types.ObjectId, ref: "Comment" }] },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      required: false, // if not populated, then its a top level comment
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
