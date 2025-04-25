const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema(
  {
    countryName: String,
    title: String,
    value: String,
    flagUrl: String,
  },
  {
    timestamps: true,
  }
);

const Language = mongoose.model("Language", LanguageSchema);
module.exports = Language;
