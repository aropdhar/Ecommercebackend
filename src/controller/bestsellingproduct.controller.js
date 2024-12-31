const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {bestsellingModel} = require('../Model/bestSelling.model.js');

const bestsellingcontroller = async(req,res)=>{
    try {
        console.log("arop Dhar");
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `bestselling controller Error: ${error}`))
    }
}

module.exports = {bestsellingcontroller}
