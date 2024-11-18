const express = require('express')
const {Router} = express;
const _ = Router();
const {subcategoryController , getAllsubcategory , deletesubcategory} = require('../../controller/subcategory.controller.js')

_.route("/subcategory").post(subcategoryController).get(getAllsubcategory);
_.route("/deletesubcategory/:id").delete(deletesubcategory)

module.exports = _;