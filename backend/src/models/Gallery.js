const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GallerySchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }
}, {
  timestamps: true,
  autoCreate: true
})

const Gallery = mongoose.model('Gallery', GallerySchema)
module.exports = Gallery

