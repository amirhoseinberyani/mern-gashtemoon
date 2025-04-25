const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderFeatureSchema = new Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    onQuoteDescription: String,
    cardNumber: { type: String, unique: true },
    bio: String,
    scope:[{ type: String }],
    workRecords: String,
    educationRecords: String,
    cardType: [{ type: Number }],
    cardLanguage: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Language" }],
    managedCities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
    cvUrl: String,
    socials:
    {
      type: Map,
      of: String,
    },
    level: Number,
  },
  {
    timestamps: true,
  }
);

const LeaderFeature = mongoose.model("LeaderFeature", LeaderFeatureSchema);
module.exports = LeaderFeature;