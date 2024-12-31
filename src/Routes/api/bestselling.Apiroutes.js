const express = require('express')
const {Router} = express;
const _ = Router();
const {bestsellingcontroller} = require('../../controller/bestsellingproduct.controller')

_.route("/bestsellingproduct").post(bestsellingcontroller)

module.exports = _;