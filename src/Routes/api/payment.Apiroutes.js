const express = require('express')
const {Router} = express;
const _ = Router();
const {paymentcontroller} = require('../../controller/payment.controller.js')

_.route('/success').post(paymentcontroller)

module.exports= _;