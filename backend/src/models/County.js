const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountySchema = new Schema(
  {
    row: Number,
    name_en: String,
    provinceId: { type: mongoose.SchemaTypes.ObjectId, ref: "Province" },
    url: String,
    name_fa: String,
    points: String,
    symbol: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const County = mongoose.model("County", CountySchema);
module.exports = County;
