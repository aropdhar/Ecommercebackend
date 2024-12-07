const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');


const productcontroller = async (req , res)=>{
   try {
    
     const image = req.files;

   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `product Controller Error: ${error}`))
   }
}

module.exports = {productcontroller}