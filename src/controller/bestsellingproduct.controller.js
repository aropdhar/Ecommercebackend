const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {bestsellingModel} = require('../Model/bestSelling.model.js');

/**
 * product controller Create
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const bestsellingcontroller = async(req,res)=>{
    try {
        const {product} = req?.body;
        if(!product){
            return res.status(400).json(new apiError(false , null , 404 , `product missing!!`))
        }
        
        // This Product Already Exist in database

        const productAlreadyExist = await bestsellingModel.find({product: product});

        if(productAlreadyExist?.length){
            return res.status(400).json(new apiError(false , null , 404 , `${product} Already Exist!!`))
        }

        // now database save

        const bestSellingSave = await bestsellingModel({product}).save()

        if(bestSellingSave){
            return res.status(200).json(new apiResponse(true , bestSellingSave, 200 , null , "bestSellingProDuct Create  Successfully!!"))
        }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `bestselling controller Error: ${error}`))
    }
}

/**
 * Get All Best Selling Product
*/


const bestSellingGetAllProduct =  async(req, res)=>{
    try {
 
        const GetAllbestsellingproduct = await bestsellingModel.find({}).populate("product");

        if(GetAllbestsellingproduct){
            return res.status(200).json(new apiResponse(true , GetAllbestsellingproduct, 200 , null , "Get All bestsellingproduct Successfully!!"))
        }else{
            return res.status(400).json(new apiError(false , null , 404 , `bestselling product Not Found`))
        }

        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `bestSellingGetAllProduct controller Error: ${error}`))
    }
}

/**
 * Get All Best Selling Product
*/

const UpdatebestSellingProduct =  async(req,res)=>{
    try {
        const {productId} = req?.params;

        const updatebestselling = await bestsellingModel.findOneAndUpdate(
            {product: productId},
            {...req.body},
            {new: true}
        );

        if(updatebestselling){
            return res.status(200).json(new apiResponse(true , updatebestselling, 200 , null , "update bestselling product Successfully!!"))
        }else{
            return res.status(400).json(new apiError(false , null , 404 , `bestselling Product Updated Failed`))
        }
    
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `UpdatebestSellingProduct controller Error: ${error}`))
    }
}

/**
 * Delete Best Selling Product
*/

const deletebestsellingproduct = async(req,res)=>{
   try {
     
    const {productId} = req.params;

    const deletebestselling = await bestsellingModel.findOneAndDelete({product: productId});

    if(deletebestselling){
        return res.status(200).json(new apiResponse(true , deletebestselling, 200 , null , "delete bestselling product Successfully!!"))
    }else{
        return res.status(400).json(new apiError(false , null , 404 , `bestselling delete failed`))
    }

    
   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `delete bestselling product controller Error: ${error}`))
   }
}

module.exports = {bestsellingcontroller , bestSellingGetAllProduct , UpdatebestSellingProduct , deletebestsellingproduct}
