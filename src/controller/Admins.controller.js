const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {adminsmodel} = require('../Model/admins/amins.model.js')
const {bcryptpassword} = require('../helper/helper.js')

const adminscontroller = async (req , res)=>{
    try {
        
        const {userNameorEmail , password} = req.body;

        if(!userNameorEmail || !password){
            return res.status(400).json(new apiError(false , null , 404 , `admins credential Error`));
        }
       
        // check is alreay exist

        const alreayisExist = await adminsmodel.find({userNameorEmail: userNameorEmail});

        if(alreayisExist?.length){
            return res.status(400).json(new apiError(false , null , 404 , `${userNameorEmail} Already Exist`));
        }

        const adminhashpassword = await bcryptpassword(password)

        const adminsuser = await new adminsmodel({
            userNameorEmail ,
            password: adminhashpassword,
            // image: (image && {...image})
        }).save()

        if(adminsuser){
            return res.status(200).json(new apiResponse(true , adminsuser, 200 , null , "adminsuser create Successfully!!"))
        }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `admins controller  Error: ${error}`))
    }
}

module.exports = {adminscontroller}