const express = require('express')
const {Router} = express;
const _ = Router();
const {adminscontroller} = require('../../controller/Admins.controller.js')

_.route("/admin").post(adminscontroller)

module.exports = _;