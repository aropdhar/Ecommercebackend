const express = require('express')
const {Router} = express;
const _ = Router();
const {placeorder} = require('../../controller/order.controller.js')
const {authguard} = require('../../middleware/authguard.js')

_.route('/order').post(authguard, placeorder)

module.exports=_;