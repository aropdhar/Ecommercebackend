const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');


const subcategoryController = async (req , res)=>{
  try {
    
  } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `subcategory Controller Error: ${error}`))
  }   
}

module.exports = {subcategoryController}