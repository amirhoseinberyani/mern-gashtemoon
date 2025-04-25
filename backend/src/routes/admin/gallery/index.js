const express = require('express')
const Router = express.Router()
const GalleryController = require('../../../controllers/admin/galleryController')

Router.post('/', GalleryController.GetGalleries)
Router.post('/add-edit', GalleryController.AddOrEditGallery)
Router.delete('/remove-image', GalleryController.RemoveImage)

module.exports = Router