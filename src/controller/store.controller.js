const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {storemodel} = require('../Model/marchant.model.js')
const {phonenumberChecker , EmailChecker} = require('../utils/allchecker.js')

const createmarchant = async(req , res)=>{
   
    try {
        
       const {email, phoneNumber , storename, users} = req.body;
       
       if(!email || !phoneNumber || !storename || !users){
        return res.status(400).json(new apiError(false , null , 404 , `marchant crendential missing!!`))
       }

       if(!phonenumberChecker(phoneNumber) || !EmailChecker(email)){
        return res.status(400).json(new apiError(false , null , 404 , `Email or Phone Number Format crendential Invalid!!`))
       }

       const marchantinfo = new storemodel({
          email, phoneNumber , storename, users
       }).save()

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `storecontroller Error: ${error}`))
    }

}


module.exports = {createmarchant}