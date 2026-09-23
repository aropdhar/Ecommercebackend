const express = require('express')
const {Router} = express;
const _ = Router();
const {placeorder , gellAllOrder , userorder , cancelUserOrder ,SingleOrderController} = require('../../controller/order.controller.js')
const {authguard } = require('../../middleware/authguard.js')

_.route('/order').post(authguard, placeorder);
_.route('/userorder').get(authguard , userorder);
_.route('/usercancelorder/:orderId').get(authguard , cancelUserOrder)

// for admin
_.route('/getallorder').get(gellAllOrder);
_.route('/singleorder/:id').get(SingleOrderController)

module.exports=_;