const express = require('express')
const {Router} = express;
const _ = Router();
const {createmarchant} = require('../../controller/store.controller.js')

_.route("/becomemarchant").post(createmarchant)

module.exports = _;