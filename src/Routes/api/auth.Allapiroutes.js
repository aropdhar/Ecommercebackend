const express = require('express')
const {Router} = express;
const _ = Router();
const {apiResponse} = require('../../utils/apiResonse.js')

_.route("/getname").get((req , res)=>{
    res.status(200).json(new apiResponse(true , "E-commerce" , 200 , "Routes Is Error" , "Everything is ok"))
})

module.exports = _;