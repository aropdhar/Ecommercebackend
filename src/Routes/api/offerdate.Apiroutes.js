const express = require('express')
const {Router} = express;
const _ = Router();
const {offerDatecontroller , getAllOfferDate} = require('../../controller/offerdate.controller.js')

_.route("/offerdate").post(offerDatecontroller).get(getAllOfferDate)

module.exports = _;