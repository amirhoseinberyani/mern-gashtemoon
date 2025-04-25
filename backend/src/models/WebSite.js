const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeaderSchema = new Schema({
  index: { type: Number },
  title: String,
  description: String,
  image: String,
});
const StatisticSchema = new Schema({
  index: { type: Number },
  title: String,
  image: String,
  description: String,
});
const FooterSchema = new Schema({
  description: String,
  url: String,
  instagram: String,
  telegram: String,
  whatsapp: String,
  youtube: String,
});

const WebSiteSchema = new Schema(
  {
    lang: { type: String, default: "fa" },
    navbarIcon: String,
    headers: { type: [HeaderSchema] },
    statistics: { type: [StatisticSchema] },
    footer: { type: FooterSchema },
  },
  {
    timestamps: true,
    autoCreate: true,
  }
);

const WebSite = mongoose.model("WebSite", WebSiteSchema);
module.exports = WebSite;
