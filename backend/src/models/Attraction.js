const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  longitute: String,
  latitude: String,
});

const RateSchema = new Schema({
  sum: { type: Number, default: 0 },
  userCount: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
});

const AttractionSchema = new Schema(
  {
    cover: String,
    title: String,
    provinceId: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Province" }],
    countyId: [{ type: mongoose.SchemaTypes.ObjectId, ref: "County" }],
    rate: {
      type: RateSchema,
      default: {
        sum: 0,
        userCount: 0,
        rate: 0,
      },
    },
    location: LocationSchema,
    wishVisits: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    visiteds: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    favorites: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    usersRate: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    relatedPosts: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
    ],
    usersSuggest: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    generalId: { type: mongoose.Types.ObjectId, default: null },
    attractionType: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "AttractionType" },
    ],
    moreImages: [String],
    lang: { type: String, default: "fa" },
    caseFeatures: [{ index: Number, title: String, value: String }],
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const Attraction = mongoose.model("Attraction", AttractionSchema);
module.exports = Attraction;
