const express = require('express')
const {Router} = express;
const _ = Router();
const {subcategoryController} = require('../../controller/subcategory.controller.js')

_.route("/subcategory").post(subcategoryController)

module.exports = _;