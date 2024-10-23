/**
 * todo: create controll implement
 * @param {req.body} req 
 * @param {( )} res 
 */


const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {asynhandler} = require('../utils/asynhandler.js');
const {usermodel} = require('../Model/User.model.js');
const {EmailChecker , passwordChecker} = require('../utils/allchecker.js');
const {bcryptpassword , generateAccesToken , decodedhashpassword} = require('../helper/helper.js');

const {sendMailer} = require('../utils/sendmailer.js')
const {makeotp} = require('../helper/otpgenerator.js')
const bcrypt = require('bcrypt');

const options = {
  httpOnly: true,
  secure: true,
};

// registration section

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
   
  
    // senderemail
    const otp =  await makeotp()
    const mailer = await sendMailer(FirstName , Email_Adress , otp);
    
    
    if(users || mailer){

      // set otp database create
       await usermodel.findOneAndUpdate(
        {_id: users._id}, 
        {
          $set: {OTP: otp}
        }, 
        {
          new: true
        }
      );

      const recentuser = await usermodel.find({ $or: [{FirstName}, {Email_Adress}] }).select("-Password")

      return res.status(200).json(new apiResponse(true , recentuser, 200 , null , "Registration Successfully!!"))
    }
  } 
  
  catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `Registration Controller Error: ${error}`))
    
  }
     

})


// login section

const logincontroller = async (req , res)=>{
  try {
    
    const {Email_Adress , Password} = req?.body;

    if(!Email_Adress || !EmailChecker(Email_Adress)){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Address Missing or invalid email!!"))
    }

    if(!Password || !passwordChecker(Password)){
      return res.status(400).json(new apiError(false , null , 404 , "Password Missing or Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:!!"))
    }
    
    const finduser = await usermodel.findOne({Email_Adress: Email_Adress})

   const userpasswordisvalid =  decodedhashpassword(Password , finduser?.Password)
  
   //  generate access token

   const token = await generateAccesToken(Email_Adress);
     

   if(userpasswordisvalid){
    return res.status(200).cookie("acesstoken" , token , options).json(new apiResponse(true , {FirstName: finduser?.FirstName} , 200 , null , "Login Successfully!!"))
   }
      
    
  } catch (error) {
    return res.status(404).json(new apiError(false , null , 404 , `logincontroller error: ${error}`))
  }
}


// otp generatormatch section

const otpmatchcontroller = async (req , res)=>{
  
  try {
    
    const {Email_Adress , OTP} = req?.body;

    if(!Email_Adress || !OTP){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Address Missing or invalid otp!!"))
    }
    
    const checkemailexistindb = await usermodel.findOne({$or: [{Email_Adress: Email_Adress} , {OTP: OTP}] })

    if(checkemailexistindb){
      checkemailexistindb.OTP = null;
      checkemailexistindb.save();

      return res.status(200).json(new apiResponse(true , 200 , null , "OTP Verfied"));
    }
    


  } catch (error) {
    return res.status(404).json(new apiError(false , null , 404 , `otpmatch controller controller error: ${error}`))
  }

}

module.exports = {Createuser , logincontroller ,otpmatchcontroller}
