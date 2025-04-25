const express = require('express')
const Router = express.Router()
const CommentController = require('../../../controllers/admin/commentController')

Router.get('/', CommentController.GetComments)
Router.post('/delete', CommentController.DeleteComment)
Router.post('/activate', CommentController.ActivateComment)

module.exports = Router