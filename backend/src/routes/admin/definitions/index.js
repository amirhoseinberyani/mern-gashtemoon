const express = require('express')
const Router = express.Router()
const DefsController = require('../../../controllers/admin/definitionController')

// POST Routes
Router.post('/add-edit-province', DefsController.AddOrEditProvince)
Router.post('/add-edit-county', DefsController.AddOrEditCounty)
Router.post('/add-edit-attr-type', DefsController.AddOrEditAttrType)


// DELETE Routes
Router.delete('/delete-province', DefsController.DeleteProvince)
Router.delete('/delete-county', DefsController.DeleteCounty)
Router.delete('/delete-attr-type', DefsController.DeleteAttrType)

module.exports = Router