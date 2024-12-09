const { productuser } = require('../Model/product.model.js');
const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const { uploadcloudinary } = require('../utils/cloudinary.js');


const productcontroller = async (req , res)=>{
   try {
    
    //  const {name , description , category , price , discountPrice , rating , review , owner , storeid} = req?.body;
     
     const nonrequireitem = ["discountPrice" , "rating" , "review"]

     for(let key in req.body){
        
        if(nonrequireitem.includes(key)){
           continue;
        }
        if(!req.body[key]){
          return res.status(400).json(new apiError(false , null , 404 , `Product ${key} Missing`));
        }
     }

     const image = req.files?.image;
     if(!image){
      return res.status(400).json(new apiError(false , null , 404 , `image missing!!`))
     }

    const imageinfo = await uploadcloudinary(image[0].path)
    
    const saveproduct = await new productuser({
      ...req.body,
      image: imageinfo?.secure_url

    }).save()
    

    if(saveproduct){
      return res.status(200).json(new apiResponse(true,saveproduct,200,null,"Product Save Successfully!!!"));
    }
    else{
      return res.status(400).json(new apiError(false , null , 404 , `Failed To product Upload`))
    }
    
     
   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `product Controller Error: ${error}`))
   }
}

module.exports = {productcontroller}