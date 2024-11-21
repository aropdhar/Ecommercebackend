const express = require('express')
const {Router} = express;
const _ = Router();
const {subcategoryController , getAllsubcategory , deletesubcategory , singlesubcategory} = require('../../controller/subcategory.controller.js')

_.route("/subcategory").post(subcategoryController).get(getAllsubcategory);
_.route("/deletesubcategory/:id").delete(deletesubcategory)
_.route("/singlesubcategory/:id").get(singlesubcategory)

module.exports = _;