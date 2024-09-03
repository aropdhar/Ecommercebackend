const express = require('express')
const {Router} = express;
const _ = Router();

_.route("/getname").get((req , res)=>{
    res.send("Hello Arop Dhar")
})

module.exports = _;