/**
 * todo: create controll implement
 * @param {req.body} req 
 * @param {( )} res 
 */


const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {asynhandler} = require('../utils/asynhandler.js');
const {usermodel} = require('../Model/User.model.js');
const {EmailChecker , passwordChecker} = require('../utils/AllChecker.js');
const {bcryptpassword , generateAccesToken} = require('../helper/helper.js');

const {sendMailer} = require('../utils/sendmailer.js')


const options = {
  httpOnly: true,
  secure: true,
};

const Createuser = asynhandler(async(req , res , next)=>{
  
  try {
    
    const {FirstName , LastName , Email_Adress , Telephone , Adress1 , City , Password} = req?.body
      
     
    if(!FirstName){
      return  res.status(400).json(new apiError(false , null , 404 , "FirstName Missing!!"))
    }

    if(!LastName){
      return res.status(400).json(new apiError(false , null , 404 , "LastName Missing!!"))
    }

    if(!Email_Adress || !EmailChecker(Email_Adress)){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Address Missing or invalid email!!"))
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
    if(!Password || !passwordChecker(Password)){
      return res.status(400).json(new apiError(false , null , 404 , "Password Missing or Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:!!"))
    }
    
    // database information create

     const existuser = await usermodel.find({ $or: [{FirstName: FirstName}, {Email_Adress: Email_Adress}] }) 
    
     if(existuser?.length){
      return res.status(400).json(new apiError(false , null , 404 , `${existuser[0]?.FirstName} Already Exist`))
     }
     
    // now make e password encrypt

    const hashpassword = await bcryptpassword(Password);
    
   //  database create

    const users = await new usermodel({
    
      FirstName , 
      LastName , 
      Email_Adress , 
      Telephone , 
      Adress1 , 
      City , 
      Password: hashpassword,

    }).save();
   
    // access token create

    const AccessToken = await generateAccesToken(Email_Adress , Telephone)
    
    // senderemail

    await sendMailer()
    
    if(users || AccessToken){
      
      const settoken = await usermodel.findOneAndUpdate(
        {_id: users._id}, 
        {
          $set: {Token: AccessToken}
        }, 
        {
          new: true
        }
      );

      const recentuser = await usermodel.find({ $or: [{FirstName}, {Email_Adress}] }).select("-Password -_id")

      return res.status(200).cookie("Token", AccessToken, options).json(new apiResponse(true , settoken, 200 , null , "Registration Successfully!!"))
    }
  } 
  
  catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `Registration Controller Error: ${error}`))
    
  }
     

})

module.exports = {Createuser}
