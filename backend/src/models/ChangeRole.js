const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeRoleSchema = new Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    role: Number,
    nationalCode: String,
    cardNumber: String,
    phoneNumber: String,
    lang: { type: String, default: "fa" },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);
const ChangeRole = mongoose.model("ChangeRole", ChangeRoleSchema);
module.exports = ChangeRole;
