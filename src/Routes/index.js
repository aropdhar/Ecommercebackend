const express = require('express')
const {Router} = express;
const _ = Router();
const authRoutes = require('./api/auth.Allapiroutes.js');
const categoryRoutes = require('./api/category.apiroutes.js');
const subcategoryroutes = require('./api/subcategory.apiroutes.js')
const storeroutes = require('./api/storeApiroutes.js');
const productroutes = require('../Routes/api/product.apiroutes.js')
const adminsRoute = require('./api/admins.apiroutes.js')
const {apiError} = require('../utils/apiError.js');


_.use(process.env.BASE_URL , authRoutes)
_.use(process.env.BASE_URL , categoryRoutes)
_.use(process.env.BASE_URL , subcategoryroutes)
_.use(process.env.BASE_URL , storeroutes)
_.use(process.env.BASE_URL , productroutes)
_.use(process.env.BASE_URL , adminsRoute)
_.use(process.env.BASE_URL , (req , res)=>{
    res.status(400).json( new apiError(false , null , 400 , "Api Routes invalid"));
})


module.exports = _;