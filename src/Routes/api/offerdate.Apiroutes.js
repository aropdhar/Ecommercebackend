const express = require('express')
const {Router} = express;
const _ = Router();
const {offerDatecontroller , getAllOfferDate , deleteoffer , updateoffer} = require('../../controller/offerdate.controller.js')

_.route("/offerdate").post(offerDatecontroller).get(getAllOfferDate)
_.route("/deleteoffer/:id").delete(deleteoffer)
_.route("/updateoffer/:id").put(updateoffer)

module.exports = _;