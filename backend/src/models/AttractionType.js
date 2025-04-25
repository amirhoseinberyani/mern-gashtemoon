const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttractionTypeSchema = new Schema(
  {
    title: String,
    parentId: { type: mongoose.SchemaTypes.ObjectId, ref: "AttractionType" },
    lang: { type: String, default: "fa" },
  },
  {
    timestamps: true,
  }
);

const AttractionType = mongoose.model("AttractionType", AttractionTypeSchema);
module.exports = AttractionType;
