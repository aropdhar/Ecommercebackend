const express = require('express')
const {Router} = express;
const _ = Router();
const {bestsellingcontroller , bestSellingGetAllProduct , UpdatebestSellingProduct , deletebestsellingproduct} = require('../../controller/bestsellingproduct.controller')

_.route("/bestsellingproduct").post(bestsellingcontroller).get(bestSellingGetAllProduct);

_.route("/bestsellingproduct/:productId").put(UpdatebestSellingProduct).delete(deletebestsellingproduct)

module.exports = _;