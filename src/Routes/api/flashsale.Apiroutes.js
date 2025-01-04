const express = require('express')
const {Router} = express;
const _ = Router();
const {flashsalecontroller , getAllFlashsaleProduct , updateFlashsaleProduct , DeleteFlashSaleProduct , singleproduct} = require('../../controller/flashsale.controller.js')

_.route("/flashsale").post(flashsalecontroller).get(getAllFlashsaleProduct)
_.route("/flashsaleupdate/:id").put(updateFlashsaleProduct)
_.route("/flashsaledelete/:id").delete(DeleteFlashSaleProduct)
_.route("/singleflashsale/:id").get(singleproduct)

module.exports = _;