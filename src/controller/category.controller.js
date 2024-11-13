const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {categorymodel} = require('../Model/category.model.js')


const categorycontroller = async (req , res)=>{
    
    try {
        const {title , description} = req?.body;

        if(!title || !description){
            return res.status(400).json(new apiError(false , null , 404 , `title or category missing!!`))
        }

        // category exist 

        const isExistcategory = await categorymodel.find({ title: title});

        if(isExistcategory?.length){
            return res.status(400).json(new apiError(false , null , 404 , `${isExistcategory[0]?.title} Already Exist`))
        }

        // category save into database

        const categoryinstace = await new categorymodel({
            title: title,
            description: description
        }).save()
        
    if(categoryinstace){
        return res.status(200).json(new apiResponse(true , categoryinstace, 200 , null , "category create  Successfully!!"))
    }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Category Controller Error: ${error}`))
    }

}


// get all category 


const getallcategory = async (req , res)=>{
   
    try {
        
      const allcategory = await categorymodel.find({})

    if(allcategory){
        return res.status(200).json(new apiResponse(true , allcategory, 200 , null , "category all  Successfully!!"))
    }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 501 , `getallcategory Error: ${error}`))
    }
    

}

// get single category

const singlecategory = async (req , res)=>{
    try {
        
        const {id} = req.params;

        const searchitem = await categorymodel.findById({_id: id});

        if(!searchitem){
            return null
        }
        
        return res.status(200).json(new apiResponse(true , searchitem, 200 , null , "retrive single category Successfully!!"))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 501 , `single category Error: ${error}`))
    }
}

// admin approved category

const approvedcategory = async (req , res)=>{
    try {
        
        const {email} = req?.body;
        console.log(email);
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 501 , `admin category controller Error: ${error}`))
    }
}

module.exports = {categorycontroller , getallcategory , singlecategory , approvedcategory}