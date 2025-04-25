const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DynastySchema = new Schema(
  {
    title_en: String,
    title_fa: String,
    kings: [{ type: mongoose.SchemaTypes.ObjectId, ref: "King" }],
    attraction: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Attraction" }],
    flag: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Gallery" }],
    capital: [],
    currency: [String],
    region: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Gallery" }],
  },
  {
    timestamps: true,
  }
);

const Dynasty = mongoose.model("Dynasty", DynastySchema);
module.exports = Dynasty;
