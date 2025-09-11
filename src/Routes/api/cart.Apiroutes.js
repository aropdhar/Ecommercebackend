const express = require('express')
const {Router} = express;
const _ = Router();
const {creatCartController , GetAllCart , DeleteCart , UpdateCart} = require('../../controller/cart.controller.js')
const {authguard} = require('../../middleware/authguard.js')


_.route('/cart').post(authguard, creatCartController);
_.route('/getallcart').get(authguard, GetAllCart);
_.route('/deletecart/:id').delete(DeleteCart);
_.route('/updatecart/:id').put(UpdateCart);



module.exports = _;