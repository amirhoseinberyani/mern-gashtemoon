const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    title: { type: String, required: true },
    writer: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    attraction: { type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" },
    image: { type: String, default: "" },
    lang: { type: String, default: "fa" },
    description: String,
    usersLike: {
      type: [{ type: Schema.Types.ObjectId, ref: "Like" }],
      default: [],
    },
    usersSave: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    tags: [String],
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);
const Experience = mongoose.model("Experience", ExperienceSchema);
module.exports = Experience;
