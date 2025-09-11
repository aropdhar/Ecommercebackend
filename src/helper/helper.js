const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// bcrypt password
const bcryptpassword = async (password) =>{
   try {
    
     const hashpassword = await bcrypt.hash(password, 10);
     return hashpassword;

   } catch (error) {
      console.log(error);
      
   }
}

// decoded password

const decodedhashpassword = async (plainpassword , encryptedpassword)=>{
   const decodepassword = await bcrypt.compare(plainpassword, encryptedpassword);

   return decodepassword;
   
}

// generate accesstoken

const generateAccesToken = async (payload) =>{

    const AccessToken = await  jwt.sign(
       payload, 
       process.env.ACCESS_TOKEN_SECRET, 
       
       { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
   
       return AccessToken;
   
}

module.exports = {bcryptpassword , generateAccesToken , decodedhashpassword}