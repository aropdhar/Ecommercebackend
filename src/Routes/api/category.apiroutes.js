const express = require('express')
const {Router} = express;
const _ = Router();
const {categorycontroller,getallcategory,singlecategory} = require('../../controller/category.controller.js')


_.route("/createcategory").post(categorycontroller)
_.route("/allcategory").get(getallcategory)
_.route("/singleallcategory/:id").get(singlecategory)


module.exports = _;