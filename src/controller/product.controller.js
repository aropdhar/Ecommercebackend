const { productuser } = require('../Model/product.model.js');
const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const { uploadcloudinary , deleteCloudinaryAssets} = require('../utils/cloudinary.js');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const {categorymodel} = require('../Model/category.model.js');

// product upload 

const productcontroller = async (req , res)=>{
   try {
    
    //  const {name , description , category , price , discountPrice , rating , review , owner , storeid} = req?.body;
     
     const nonrequireitem = ["discountPrice" , "rating" , "review" , "subcategory"]

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
    
    const isexistproduct = await productuser.find({name: req.body.name});

    if(isexistproduct?.length){
      return res.status(400).json(new apiError(false , null , 404 , `${req.body.name} Product Already Exist`))
    }

    const imageinfo = await uploadcloudinary(image)
    
    const saveproduct = await new productuser({
      ...req.body,
      image: [...imageinfo]

    }).save()
    

    if(saveproduct){
     
      // now push the product id into categorymodel

      const category = await categorymodel.findById(req.body.category);
      category.product.push(saveproduct._id);
      await category.save();
      

      // delete the previous cached
      myCache.del('getAllProduct')

      return res.status(200).json(new apiResponse(true,saveproduct,200,null,"Product Save Successfully!!!"));
    }
    else{
      return res.status(400).json(new apiError(false , null , 404 , `Failed To product Upload`))
    }
    
     
   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `product Controller Error: ${error}`))
   }
}

// get all product

const getAllProduct = async(req , res)=>{
  try {
    
     let  value = myCache.get("getAllProduct");

      if ( value == undefined ){    
        const getAllProduct = await productuser.find({}).populate(["category" , "subcategory" , "owner" , "storeid"]);
    
        if(getAllProduct){
    
          // cached product
    
          myCache.set( "getAllProduct",  JSON.stringify(getAllProduct));
    
          return res.status(200).json(new apiResponse(true,getAllProduct,200,null,"Product Save Successfully!!!"));
        }
      }else{
        return res.status(200).json(new apiResponse(true,JSON.parse(value),200,null,"Product Save Successfully!!!"));
      }


    return res.status(400).json(new apiError(false , null , 404 , `getAllProduct not Found`));

  } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `getAllProduct Controller Error: ${error}`))
  }
}

// product update

const updateproduct = async (req , res)=>{
   try {
    
     const {id} = req.params;
     const image = req.files?.image
      
     let updatedProduct = await productuser.findById(id);
     let updatedProductobj = {};

     if(image){
       await deleteCloudinaryAssets(updatedProduct?.image);
       const imageurl = await uploadcloudinary(image);
       updatedProductobj = { ...req.body, image: imageurl };
     }else{
       updatedProductobj = {...req.body}
     }
     
     
     const updateproduct = await productuser.findOneAndUpdate({_id: id} ,
      {...updatedProductobj},
      {new: true}
     ) 
     
     if(updateproduct){
      return res.status(200).json(new apiResponse(true,updateproduct,200,null,"Product Update Successfully!!!"));
     }

   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `updateproduct Controller Error: ${error}`))
   }
}

// single product controller 

const singleproduct = async (req , res)=>{
  try {
    
    const {id} = req.params;
   
    const singleproduct = await productuser.findOne({_id: id}).populate(["category" , "subcategory" , "owner" , "storeid"]);
    
    

    if(singleproduct){
      return res.status(200).json(new apiResponse(true,singleproduct,200,null,"Single Product Successfully!!!"));
    }

  } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `singleproduct Controller Error: ${error}`))
  }
}

// search product 

const searchproductcontroller = async(req , res)=>{
   try {
    
      const {name} = req.query;

      const searchproduct = await productuser.find({name: name}).populate(["category" , "subcategory" , "owner" , "storeid"]);
      
      if(searchproduct?.length){
        return res.status(200).json(new apiResponse(true,searchproduct,200,null,"Single Product Successfully!!!"));
      }else{
        return res.status(400).json(new apiError(false , null , 404 , `product Not Found`))
      }
      

   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `searchproduct controller Error: ${error}`))
   }
}

// deleted product

const deleteproductcontroller = async(req , res)=>{
  try {
     const {id} = req.params;
     const deletedproduct = await productuser.findOneAndDelete({_id: id});
     

    if(deletedproduct){

      const deleteitem = await deleteCloudinaryAssets(deletedproduct?.image);
      const category = await categorymodel.findById(deletedproduct.category);

      category.product.pull(deleteitem._id)

      await category.save()

      return res.status(200).json(new apiResponse(true,deletedproduct,200,null,"delete Product Successfully!!!"));
    }

  } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `product Not Found`))
  }

}

module.exports = {productcontroller , getAllProduct , updateproduct , singleproduct , searchproductcontroller , deleteproductcontroller}