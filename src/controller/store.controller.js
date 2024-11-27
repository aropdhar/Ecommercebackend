const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {storemodel} = require('../Model/marchant.model.js')
const {phonenumberChecker , EmailChecker} = require('../utils/allchecker.js');
const {usermodel} = require('../Model/User.model.js')

const createmarchant = async(req , res)=>{
   
    try {
        
       const {email, phoneNumber , storename, users} = req.body;
       
       if(!email || !phoneNumber || !storename || !users){
        return res.status(400).json(new apiError(false , null , 404 , `marchant crendential missing!!`))
       }

       if(!phonenumberChecker(phoneNumber) || !EmailChecker(email)){
        return res.status(400).json(new apiError(false , null , 404 , `Email or Phone Number Format crendential Invalid!!`))
       }

        //  already exist in database

        const isAlredyexist = await storemodel.find({ $or: [{email} , {storename} , {phoneNumber} , {users}] })
        
        if(isAlredyexist?.length){
            return res.status(400).json(new apiError(false , null , 404 , `Already Registared Exist`))
        }
       // save database info
       const marchantinfo = await new storemodel({
          email, phoneNumber , storename, users
       }).save()

       if(marchantinfo){
          const updateuser =await usermodel.findById(marchantinfo.users).select("-Password");     
          updateuser.Role = "Marchant";
          updateuser.save()
          

          return res.status(200).json(new apiResponse(true,updateuser,200,null,"Marchant Created sucesfully!!!"));
       }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `storecontroller Error: ${error}`))
    }

}

// marchant all get 

const getallmarchant = async (req , res)=>{

    try {
        const allmarchant = await storemodel.find({});
         
        if(allmarchant){
            return res.status(200).json(new apiResponse(true,allmarchant,200,null,"Get All Marchant!!!"));
        }
        
        return res.status(400).json(new apiError(false , null , 404 , `marchant Not Found`))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `allmarchantcontroller Error: ${error}`))
    }

}

// single marchant 

const singlemarchant = async (req , res)=>{
    try {
        
        const {id} = req.params;

        const findmarchants = await storemodel.findById({_id: id});
         
        if(findmarchants){
            return res.status(200).json(new apiResponse(true,findmarchants,200,null,"single Marchant!!!"));
        }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `single marchantcontroller Error: ${error}`))
    }
}

// update marchant

const updatemarchant =  async (req , res)=>{
   try {
    
     const {id} =  req.params;
     const{ email, phoneNumber , storename, users } = req.body;

    

     const findmarchantuser =  await storemodel.findById(id);

     if(findmarchantuser){

        const updatemarchant =  await storemodel.findOneAndUpdate({_id: id} , {

         ...(email && {email}),
         ...(phoneNumber && {phoneNumber}),
         ...(storename && {storename}),
         ...(users && {users})

        } , {new: true}).populate("users")

        if(updatemarchant){
            return res.status(200).json(new apiResponse(true,updatemarchant,200,null,"Update Marchant Successfully!!!"));
        }else{
            return res.status(400).json(new apiError(false , null , 404 , `Update Marchant Error`))
        }

     }


   } catch (error) {
    return res.status(400).json(new apiError(false , null , 404 , `updatemarchant controller Error: ${error}`))
   }
}

module.exports = {createmarchant , getallmarchant , singlemarchant , updatemarchant}