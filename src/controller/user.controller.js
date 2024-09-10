/**
 * todo: create controll implement
 * @param {req.body} req 
 * @param {( )} res 
 */

const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {asynhandler} = require('../utils/asynhandler.js');
const {usermodel} = require('../Model/User.model.js')

const Createuser = asynhandler(async(req , res , next)=>{
  

  try {
    
    const {FirstName , LastName , Email_Adress , Telephone , Adress1 , City , Password} = req?.body
      
     
    if(!FirstName){
      return  res.status(400).json(new apiError(false , null , 404 , "FirstName Missing!!"))
    }

    if(!LastName){
      return res.status(400).json(new apiError(false , null , 404 , "LastName Missing!!"))
    }

    if(!Email_Adress){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Adress Missing!!"))
    }

    if(!Telephone){
      return res.status(400).json(new apiError(false , null , 404 , "Telephone Missing!!"))
    }

    if(!Adress1){
      return res.status(400).json(new apiError(false , null , 404 , "Adress1 Missing!!"))
    }
    if(!City){
      return res.status(400).json(new apiError(false , null , 404 , "City Missing!!"))
    }
    if(!Password){
      return res.status(400).json(new apiError(false , null , 404 , "Password Missing!!"))
    }
    
    // database information create

     const existuser = await usermodel.find({ $or: [{FirstName: FirstName}, {Email_Adress: Email_Adress}] }) 
    
     if(existuser?.length){
      return res.status(400).json(new apiError(false , null , 404 , `${existuser[0]?.FirstName} Already Exist`))
     }
     
  
    const users = await new usermodel({
    
      FirstName , LastName , Email_Adress , Telephone , Adress1 , City , Password

    }).save();

    if(users){

      const recentuser = await usermodel.find({ $or: [{FirstName: FirstName}, {Email_Adress: Email_Adress}] }).select("-Password -_id")

      return res.status(200).json(new apiResponse(true , users , 200 , null , "Registration Successfully!!"))
    }
  } 
  
  catch (error) {
    console.log(error);
    
  }
     

})

module.exports = {Createuser}
