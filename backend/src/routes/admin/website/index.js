const express = require('express')
const Router = express.Router()
const SiteController = require("../../../controllers/admin/siteController");

// POST Routes
Router.post('/update-website-info', SiteController.SaveWebInfo)


module.exports = Router