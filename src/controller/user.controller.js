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
  secure: false,
};

// registration section

const Createuser = asynhandler(async(req , res , next)=>{
  
  try {
    
    const {FirstName  , Email_Adress , Password} = req?.body
      
     
    if(!FirstName){
      return  res.status(400).json(new apiError(false , null , 404 , "FirstName Missing!!"))
    } 

    if(!Email_Adress || !EmailChecker(Email_Adress)){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Address Missing or invalid email!!"))
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
      Email_Adress , 
      Password: hashpassword,

    }).save();
   
  
    // senderemail
    const otp =  await makeotp()
    const mailer = await sendMailer(FirstName , otp , Email_Adress);
    
       
 

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
    
    const finduser = await usermodel.findOne({Email_Adress: Email_Adress});

    const userpasswordisvalid = await decodedhashpassword(Password , finduser?.Password);
  
   //  generate access token

   const token = await generateAccesToken({email: Email_Adress , id: finduser?._id});
     

   if(userpasswordisvalid){
    return res.status(200).cookie("acesstoken" , token , options).json(new apiResponse(true , {FirstName: finduser?.FirstName , token: `Bearer ${token}`} , 200 , null , "Login Successfully!!"));
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
    
    const checkemailexistindb = await usermodel.findOne({$and: [{Email_Adress: Email_Adress} , {OTP: OTP}] });

    if(checkemailexistindb){
      checkemailexistindb.OTP = null;
      checkemailexistindb.save();

      return res.status(200).json(new apiResponse(true , checkemailexistindb , 200 , "OTP Verfied"));
    }
    
    return res.status(404).json(new apiError(false , null , 404 , `OTP Doesn't Match`));

  } catch (error) {
    return res.status(404).json(new apiError(false , null , 404 , `otpmatch controller controller error: ${error}`))
  }

}

// Forgotpassword section

const Forgotpasswordcontroller = async (req , res)=>{
   try {
     const {Email_Adress} = req?.body;

     if(!Email_Adress || !EmailChecker(Email_Adress)){
      return res.status(400).json(new apiError(false , null , 404 , "Email_Address Missing or invalid email!!"))
    }

    const emailexist = await usermodel.findOne({Email_Adress: Email_Adress}).select("-password -OTP");

    if(emailexist){
      const otp =  await makeotp()
      await sendMailer(emailexist?.FirstName , Email_Adress , otp);
      
      emailexist.resetOTP = otp;
      emailexist.save()

      return res.status(200).json(new apiResponse(true , emailexist , 200 , null , "Check Your Email"));
    }
    
   } catch (error) {
      return res.status(404).json(new apiError(false , null , 404 , `Forgotpassword error: ${error}`))
   }
}

// Forgotpassword conroller section

const resetpasswordcontroller = async(req ,res)=>{
     
  try {
    const {Email_Adress , OTP , newpassword} = req?.body;

    if(!Email_Adress || !EmailChecker(Email_Adress)){
      return res.status(400).json(new apiError(false , null , 404 , "credential missing or wrong email or password format"))
    }
    
    if(!OTP || !newpassword || !passwordChecker(newpassword)){
      return res.status(400).json(new apiError(false , null , 404 , "credential missing or wrong password or otp"))
    }

    const isexistuser = await usermodel.findOne({$or: [{Email_Adress: Email_Adress} , {resetOTP: OTP}]});

    if(isexistuser){
      const newhaspassword = await bcryptpassword(newpassword)
      isexistuser.Password = newhaspassword;
      isexistuser.resetOTP = null;
      await isexistuser.save()
      
      return res.status(200).json(new apiResponse(true , isexistuser , 200 , null , "Password Updated Successfully!!"));
    }

  } catch (error) {
    return res.status(404).json(new apiResponse(true , null , 404 , `Reset password error: ${error}`))
  }
}

// get all register user 

const getallusercontroller = async(req , res)=>{
  
  try {
    
    const alluser = await usermodel.find({}).select("-Password -OTP -resetOTP -Token" );
    
    if(alluser?.length){
      return res.status(200).json(new apiResponse(true , alluser , 200 , null , "Password Updated Successfully!!"));
    }
  
  } catch (error) {
    return res.status(404).json(new apiError(false , null, 404 , `get all user error: ${error}`))
  }

}

// change user role controller

const changerolecontroller = async (req , res)=>{
   try {
    
     const {Email_Adress , Telephone , Role} = req?.body;

     if(!Email_Adress || !Telephone){
       return res.status(404).json(new apiError(false , null , 404 , `Credential missing`))
     }
     
     const isexistuser = await usermodel.findOne({$or: [{Email_Adress: Email_Adress} , {Telephone: Telephone}]}).select("-Password -OTP -resetOTP");
     
     if(isexistuser){
        if(isexistuser.Role === "users"){
           isexistuser.Role = Role;
           await isexistuser.save();

           return res.status(200).json(new apiResponse(true,isexistuser,200,null,"Role updated sucessfully you are in marchant"));
        }
     }else{

       return res.status(200).json(new apiResponse(true , isexistuser?.FirstName , 200 , null , "you are already marchant"));
       
     }
     

   } catch (error) {
    
    return res.status(404).json(new apiError(false , null , 404 , `Changeuseconroller Error:${error}`))

   }
}

module.exports = {Createuser , logincontroller , otpmatchcontroller ,Forgotpasswordcontroller , resetpasswordcontroller , getallusercontroller , changerolecontroller}
 