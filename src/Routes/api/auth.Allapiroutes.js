const express = require('express')
const {Router} = express;
const {apiResponse} = require('../../utils/apiResonse.js')
const {Createuser} = require('../../controller/user.controller.js')
const _ = Router();

_.route("/registration").post(Createuser)

module.exports = _;