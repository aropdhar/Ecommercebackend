const express = require('express')
const {Router} = express;
const _ = Router();
const authRoutes = require('./api/auth.Allapiroutes.js');
const categoryRoutes = require('./api/category.apiroutes.js');
const subcategoryroutes = require('./api/subcategory.apiroutes.js')
const {apiError} = require('../utils/apiError.js');

_.use(process.env.BASE_URL , authRoutes)
_.use(process.env.BASE_URL , categoryRoutes)
_.use(process.env.BASE_URL , subcategoryroutes)
_.use(process.env.BASE_URL , (req , res)=>{
    res.status(400).json( new apiError(false , null , 400 , "Api Routes invalid"))
})


module.exports = _;