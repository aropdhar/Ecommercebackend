const express = require('express')
const {Router} = express;
const _ = Router();
const {createmarchant , getallmarchant , singlemarchant , updatemarchant} = require('../../controller/store.controller.js')

_.route("/becomemarchant").post(createmarchant)
_.route("/getallmarchant").get(getallmarchant)
_.route("/singlemarchant/:id").get(singlemarchant)
_.route("/updatemarchant/:id").patch(updatemarchant)


module.exports = _;