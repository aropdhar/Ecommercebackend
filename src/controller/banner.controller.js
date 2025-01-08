const { bannerModel } = require('../Model/banner.model.js');
const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {uploadcloudinary , deleteCloudinaryAssets} = require('../utils/cloudinary.js')

const bannerController = async(req , res)=>{
   try {
     
    const {name} = req.body;
    const image = req.files.image;

    if(!name || !image){
        return res.status(400).json(new apiError(false , null , 404 , `Banner Credential Missing!!`));
    }
    
    //  check now database already image or name exist

    const isAlreadyExist = await bannerModel.find({name: name});

    if(isAlreadyExist?.length){
        return res.status(400).json(new apiError(false , null , 404 , `Banner ${name} Name Alreay Exist`));
    }

    const uploadurl = await uploadcloudinary(image);


    // now save the banner database 

    const bannersave = await new bannerModel({
        name: name,
        image: uploadurl[0]
    }).save()

    if(bannersave){
        return res.status(200).json(new apiResponse(true , bannersave, 200 , null , "Banner Create Successfully!!"))
    }
    return res.status(401).json(new apiError(false , null , 404 , `banner database not save`))

   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `banner controller   Error: ${error}`))
   }
}

// getallbanner controller

const getAllBannercontroller = async(req,res)=>{
    try {
      
        const getAllBanner = await bannerModel.find({});
        if(getAllBanner){
            return res.status(200).json(new apiResponse(true , getAllBanner, 200 , null , "GetAll Banner Successfully!!"))
        }
      
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `getAllBanner controller  Error: ${error}`))
    }
}

module.exports = {bannerController , getAllBannercontroller}