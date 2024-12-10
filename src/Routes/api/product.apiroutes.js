const express = require('express')
const {Router} = express;
const _ = Router();
const {productcontroller , getAllProduct , updateproduct} = require('../../controller/product.controller.js');
const {upload} = require('../../middleware/multer.middleware.js')

_.route("/product").post(upload.fields([{ name: 'image', maxCount: 10 }]),productcontroller).get(getAllProduct);

_.route("/product/:id").patch(upload.fields([{ name: 'image', maxCount: 10 }]),updateproduct);

module.exports = _;