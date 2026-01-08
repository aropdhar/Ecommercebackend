const express = require('express')
const {Router} = express;
const _ = Router();
const {bannerController , getAllBannercontroller , updateBanner} = require('../../controller/banner.controller.js')
const {upload} = require('../../middleware/multer.middleware.js')

_.route("/banner").post(upload.fields([{name: "image" , maxCount: 1}]),bannerController).get(getAllBannercontroller);


_.route("/bannerupdate/:id").put(upload.fields([{name: "image" , maxCount: 1}]),updateBanner);


module.exports = _;