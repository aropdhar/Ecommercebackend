const express = require('express')
const {Router} = express;
const {Createuser , logincontroller , otpmatchcontroller , Forgotpasswordcontroller , resetpasswordcontroller , getallusercontroller , changerolecontroller} = require('../../controller/user.controller.js');
const { authguard } = require('../../middleware/authguard.js');
const _ = Router();

_.route("/registration").post(Createuser);
_.route("/login").post(logincontroller);
_.route("/otp-verification").post(otpmatchcontroller);
_.route("/forgotpassword").post(Forgotpasswordcontroller);
_.route("/resetpassword").post(resetpasswordcontroller);
_.route("/getalluser").get(getallusercontroller);
_.route("/change-role").post(changerolecontroller);



module.exports = _;