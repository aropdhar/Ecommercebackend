const express = require('express')
const {Router} = express;
const _ = Router();
const authRoutes = require('./api/auth.Allapiroutes.js');
const {apiError} = require('../utils/apiError.js');

_.use(process.env.BASE_URL , authRoutes)
_.use(process.env.BASE_URL , (req , res)=>{
    res.status(400).json( new apiError(false , null , 400 , "Api Routes invalid"))
})


module.exports = _;