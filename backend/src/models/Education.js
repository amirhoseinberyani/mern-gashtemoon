const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new Schema(
  {
    title: String,
    typeId: Number,
    lang: { type: String, default: "fa" },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", EducationSchema);
module.exports = Education;
