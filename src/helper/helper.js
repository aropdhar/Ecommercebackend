const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptpassword = async (password) =>{
   try {
    
     const hashpassword = await bcrypt.hash(password, 10);
     return hashpassword;

   } catch (error) {
      console.log(error);
      
   }
}

const generateAccesToken = async (Email_Adress , Telephone) =>{

    const AccessToken = await  jwt.sign(
       {

           Email_Adress,
           Telephone,

       }, process.env.ACCESS_TOKEN_SECRET, 
       
       { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
   
       return AccessToken;
   
}

module.exports = {bcryptpassword , generateAccesToken}