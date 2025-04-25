const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema(
  {
    name_en: String,
    name_fa: String,
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
