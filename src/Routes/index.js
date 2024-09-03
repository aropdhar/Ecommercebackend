const express = require('express')
const {Router} = express;
const _ = Router();
const authRoutes = require('./api/auth.Allapiroutes.js');

_.use(process.env.BASE_URL , authRoutes)


module.exports = _;