const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
  {
    row: Number,
    name_en: String,
    url: String,
    name_fa: String,
    points: String,
    symbol: String,
    cities: [
      {
        row: Number,
        name_fa: String,
        points: String,
      },
    ],
    cover: String,
  },
  {
    timestamps: true,
  }
);

const Province = mongoose.model("Province", ProvinceSchema);
module.exports = Province;
