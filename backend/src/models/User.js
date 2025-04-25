const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    nationalCode: String,
    birthday: String,
    job: String,
    profileUrl: String,
    password: { type: String },
    role: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    defaultAvatar: { type: Number, default: 1 },
    email: { type: String, maxLength: 100, unique: true, index: true },
    gender: { type: String, enum: ["male", "female"] },
    likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }],
    saves: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }],
    friends: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    followings: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    visiteds: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" }],
    favorites: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" }],
    education: { type: mongoose.SchemaTypes.ObjectId, ref: "Education" },
    wishVisits: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" }],
    features: { type: mongoose.SchemaTypes.ObjectId, ref: "LeaderFeature" },
    relatedAttractions: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" },
    ],
    groups: [
      {
        groupId: { type: mongoose.SchemaTypes.ObjectId, ref: "Group" },
        budget: { type: Number, default: 0 },
      },
    ],
    tokens: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
