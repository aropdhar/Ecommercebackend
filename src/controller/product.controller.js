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

    const cloudinary = await uploadcloudinary(image[0].path)
    console.log(cloudinary);
    
     
   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `product Controller Error: ${error}`))
   }
}

module.exports = {productcontroller}