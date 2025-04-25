const express = require('express')
const Router = express.Router()
const PostController = require('../../../controllers/admin/postController')

// POST Routes
Router.post('/add-edit', PostController.AddOrEditPost)
Router.delete('/delete', PostController.DeletePost)

// GET Routes

module.exports = Router