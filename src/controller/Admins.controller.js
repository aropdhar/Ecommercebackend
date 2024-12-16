const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');


const adminscontroller = (req , res)=>{
    try {
        console.log("Admins");
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `admins controller  Error: ${error}`))
    }
}

module.exports = {adminscontroller}