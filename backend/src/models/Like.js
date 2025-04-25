const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    from: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    to: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
    lang: { type: String, default: "fa" },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);
const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
