const express = require('express')
const {Router} = express;
const _ = Router();
const {successcontroller , failedcontroller , cancelcontroller} = require('../../controller/payment.controller.js')

_.route('/success/:trans_id').post(successcontroller)
_.route('/fail/:trans_id').post(failedcontroller)
_.route('/cancel/:trans_id').post(cancelcontroller)

module.exports= _;