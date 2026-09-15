const express = require('express')
const {Router} = express;
const _ = Router();
const {adminscontroller , adminslogincontroller} = require('../../controller/Admins.controller.js');
const { adminauthguard } = require('../../middleware/adminauthguard.js');


_.route("/admin/signup").post(adminscontroller)
_.route("/admin/login").post(adminslogincontroller)

module.exports = _;