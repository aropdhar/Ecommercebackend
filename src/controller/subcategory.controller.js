const { categorymodel } = require('../Model/category.model.js');
const { subcategorymodel } = require('../Model/subcategory.model.js');
const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');


const subcategoryController = async (req , res)=>{
  try {
     const {title , description , category} = req.body;

     if(!title || !description || !category){
      return res.status(400).json(new apiError(false , null , 404 , `sub category crendential missing!!`))
     }

     const creatsubcategory = await new subcategorymodel({
        title , description , category
     }).save()

     if(creatsubcategory){
        // const findcategorybyid = await categorymodel.findOneAndUpdate(
        //   {_id: category},
        //   {
        //     $push: { subcategory: creatsubcategory._id }
        //   },
        //   {new:true}
        // );
        
        const findcategorybyid = await categorymodel.findById(category);
        findcategorybyid.subcategory.push(creatsubcategory._id);
        findcategorybyid.save()

        return res.status(200).json(new apiResponse(true,creatsubcategory,200,null,"Sub Category Created sucesfully!!!"));

     }else{
        return null
     }
     

  } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `subcategory Controller Error: ${error}`))
  }   
}

// get all subcategory 

const getAllsubcategory =  async (req , res)=>{
   try {
      const allsubcategory = await subcategorymodel.find().populate('category');
      if(allsubcategory?.length){
        return res.status(200).json(new apiResponse(true,allsubcategory,200,null,"all Sub Category  sucesfully!!!"));
      }
      
   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `getAllsubcategory Controller Error: ${error}`))
   }
}

// delete subcategory

const deletesubcategory = async (req , res)=>{
    try {
      
       const {id} = req.params;

       const deleteitem = await subcategorymodel.findOneAndDelete({_id: id});

       if(deleteitem){
          const searchcatgory = await categorymodel.findById(deleteitem.category);
  
          if(searchcatgory){
            searchcatgory.subcategory.pull(deleteitem._id);
            await searchcatgory.save()
          }else{
            return null
          }
       }else{
          return null
       }
       

    } catch (error) {
      return res.status(400).json(new apiError(false , null , 404 , `deletesubcategory Controller Error: ${error}`))
    }
}


// single sub category

const singlesubcategory = async(req , res)=>{
   
   try {
      
      const {id} = req.params;

      const singlesubcategory = await subcategorymodel.findById(id).populate("category");

      if(singlesubcategory){
         
         return res.status(200).json(new apiResponse(true,singlesubcategory,200,null,"single Sub Category retrive sucesfully!!!"));

      }else{
         return res.status(400).json(new apiError(false , null , 404 , `singlesubcategory  Error`))
      }

   } catch (error) {
      return res.status(400).json(new apiError(false , null , 404 , `singlesubcategory Controller Error: ${error}`))
   }

}

module.exports = {subcategoryController , getAllsubcategory , deletesubcategory , singlesubcategory}