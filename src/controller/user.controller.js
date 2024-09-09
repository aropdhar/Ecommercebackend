/**
 * todo: create controll implement
 * @param {req.body} req 
 * @param {( )} res 
 */

const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {asynhandler} = require('../utils/asynhandler.js')

const Createuser = asynhandler((req , res , next)=>{
  
  try {
      const {FirstName , LastName , Email_Adress , Telephone , Adress1 , City , Password} = req?.body
      
      console.log(FirstName , LastName , Email_Adress , Telephone , Adress1 , City , Password);
     

  } catch (error) {
     console.log(error);
      
  }

})

module.exports = {Createuser}
