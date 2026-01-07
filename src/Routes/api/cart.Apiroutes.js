const express = require('express')
const {Router} = express;
const _ = Router();
const {creatCartController , GetAllCart , DeleteCart , UpdateCart , incrementcart , decrementcart , cartuserwise} = require('../../controller/cart.controller.js')
const {authguard} = require('../../middleware/authguard.js')


_.route('/cart').post(authguard, creatCartController);
_.route('/getallcart').get(authguard, GetAllCart);
_.route('/deletecart/:id').delete(authguard, DeleteCart);
_.route('/updatecart/:id').put(UpdateCart);
_.route('/incrementcart/:id').post(authguard, incrementcart);
_.route('/decrementcart/:id').post(authguard, decrementcart);
_.route('/userwisecart').get(authguard, cartuserwise);


module.exports = _;