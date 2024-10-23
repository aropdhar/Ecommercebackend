const express = require('express')
const {Router} = express;
const {Createuser , logincontroller , otpmatchcontroller} = require('../../controller/user.controller.js');
const { authguard } = require('../../middleware/authguard.js');
const _ = Router();

_.route("/registration").post(Createuser)
_.route("/login").post(logincontroller)
_.route("/otp-verification").post(otpmatchcontroller)


module.exports = _;