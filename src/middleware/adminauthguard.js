const { apiError } = require("../utils/apiError")
const jwt = require('jsonwebtoken');

const adminauthguard = (req , res)=>{
   try {

      const {cookie , authorization} = req.headers;
      const token = authorization?.startsWith('Bearer ') ? authorization.split(' ')[1] : null;
      const admintoken = cookie?.split('=')[1]
      

      const finaltoken = token || admintoken;
      if(!finaltoken){
        return res.status(404).json(new apiError(false , null , 404 , `Admin Token Missing!!!`))
      }

      const decoded = jwt.verify(finaltoken.trim(), process.env.ACCESS_TOKEN_SECRET)
      
      if(decoded?.role !== 'admin'){
        return res.status(403).json(new apiError(false, null, 403, "Access denied: Not an admin token"));
      }

      req.admin = decoded;
      next()
      
   } catch (error) {
     return res.status(404).json(new apiError(false , null , 404 , `Admin Authguard middleware error: ${error}`))
   }
}


module.exports = {adminauthguard}