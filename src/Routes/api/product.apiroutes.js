const express = require('express')
const {Router} = express;
const _ = Router();
const {productcontroller , getAllProduct , updateproduct , singleproduct , searchproductcontroller} = require('../../controller/product.controller.js');
const {upload} = require('../../middleware/multer.middleware.js')

_.route("/product").post(upload.fields([{ name: 'image', maxCount: 10 }]),productcontroller).get(getAllProduct);

_.route("/product/:id").patch(upload.fields([{ name: 'image', maxCount: 10 }]),updateproduct)

_.route("/singleproduct/:id").get(singleproduct)

_.route("/product-search").get(searchproductcontroller)

module.exports = _;