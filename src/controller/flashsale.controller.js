const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {flashsaleModel} = require('../Model/flashSale.model.js')


const flashsalecontroller = async(req , res)=>{
    try {
        const {productId , offerDate} = req?.body;

        if(!productId || !offerDate){
            return res.status(400).json(new apiError(false , null , 404 , `Flashsale Credential Error`))
        }
        
    // check this isflashsaleexist already Exist

        const isFlashsaleProductExist = await flashsaleModel.findOne({productId});

        if(isFlashsaleProductExist){
            return res.status(400).json(new apiError(false , null , 404 , `${productId} Already Exist`));
        }
    // flashsale save database

        const flashsaleSave = await new flashsaleModel({
            productId , offerDate
        }).save()

        if(flashsaleSave){
            return res.status(200).json(new apiResponse(true,flashsaleSave,200,null,"Flashsale Create Successfully!!!"));
        }
 
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `flashsale controller Error: ${error}`))
    }
}

// get all flashsale product

const getAllFlashsaleProduct = async(req , res)=>{
    try {

            const getAllFlashSaleProduct = await flashsaleModel.find({}).populate({
                path: 'productId',
                select: "-description -category -subcategory -owner -storeid"
            }).lean()

            if(getAllFlashSaleProduct){
                return res.status(200).json(new apiResponse(true,getAllFlashSaleProduct,200,null,"getAllFlashSale Product Successfully!!!"));
            }
    
        
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `getAllFlashsaleProduct Controller Error: ${error}`))
    }
}

// update FlashSale Product 

const updateFlashsaleProduct = async(req , res)=>{
    try {
        
        const {id} = req.params;

        const updateflashsaleproduct = await flashsaleModel.findOneAndUpdate({_id: id},
            {
                ...req.body
            },
            {
                new: true
            }
        )

        if(updateflashsaleproduct){
            return res.status(200).json(new apiResponse(true,updateflashsaleproduct,200,null,"updateFlashsale Product Successfully!!!"));
        }
        return res.status(400).json(new apiError(false , null , 404 , `updateFlashsale Product Error`))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `getAllProduct Controller Error: ${error}`))
    }
}

// Delete FlashSale Product 

const DeleteFlashSaleProduct = async(req,res)=>{
    try {

      const {id} = req.params;

      const deleteflashsaleproduct = await flashsaleModel.findOneAndDelete({_id: id});

      if(deleteflashsaleproduct){
        return res.status(200).json(new apiResponse(true,deleteflashsaleproduct,200,null,"deleteflashsaleproduct Product Successfully!!!"));
      }
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `DeleteFlashSaleProduct Controller Error: ${error}`))
    }
}

// single flashsale product

const singleproduct = async(req,res)=>{
    try {
      const {id} = req.params;

      const singleflashsaleproduct = await flashsaleModel.findById({_id: id}).populate({path:'productId' , populate:" subcategory"});

      if(singleflashsaleproduct){
        return res.status(200).json(new apiResponse(true,singleflashsaleproduct,200,null,"singleflashsale product  Successfully!!!"));
      }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `singleproduct Controller Error: ${error}`))
    }
}

module.exports = {flashsalecontroller , getAllFlashsaleProduct ,updateFlashsaleProduct ,DeleteFlashSaleProduct , singleproduct}