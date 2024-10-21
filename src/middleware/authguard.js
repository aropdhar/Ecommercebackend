const jwt = require('jsonwebtoken');
const { apiError } = require("../utils/apiError")

const authguard = async (req , res , next)=>{
    try {
        const {cookie , authorization} = req.headers;
        const removebareer =  authorization?.split('Bearer')[1];
        const token = removebareer.split('@')[1];
        const cookiestoken = cookie?.split('=')[1]
        
        if(token){
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(decoded){
                next()
            }
            
        }
       else if(cookiestoken){
            const decoded = jwt.verify(cookiestoken, process.env.ACCESS_TOKEN_SECRET);
            if(decoded){
                next()
            }
            
        }
        
        
    } catch (error) {
        return res.status(404).json(new apiError(false , null , 404 , `authguard error: ${error}`))
    }
}

module.exports = {authguard}