const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {adminsmodel} = require('../Model/admins/admins.model.js')
const {bcryptpassword, decodedhashpassword, generateAccesToken} = require('../helper/helper.js')

const adminscontroller = async (req , res)=>{
    try {
        
        const {userNameorEmail , password} = req.body;

        if(!userNameorEmail || !password){
            return res.status(400).json(new apiError(false , null , 400 , `Admins credential Missing`));
        }
       
        // check is alreay exist

        const alreayisExist = await adminsmodel.find({userNameorEmail: userNameorEmail});

        if(alreayisExist?.length){
            return res.status(400).json(new apiError(false , null , 400 , `${userNameorEmail} Already Exist`));
        }

        const adminhashpassword = await bcryptpassword(password)

        const adminsuser = await new adminsmodel({
            userNameorEmail ,
            password: adminhashpassword,
        }).save()

        if(adminsuser){
            return res.status(200).json(new apiResponse(true , adminsuser, 200 , null , "Admins User Create Successfully!!!"))
        }

    } catch (error) {
        return res.status(500).json(new apiError(false , null , 500 , `admins controller  Error: ${error}`))
    }
}

// admin login controller 

const adminslogincontroller = async (req , res)=>{
    try {
        
        const {userNameorEmail , password} = req.body;

        if(!userNameorEmail || !password){
            return res.status(400).json(new apiError(false , null , 400 , `Credentials Missing!!!`))
        }

        const existadmin = await adminsmodel.findOne({userNameorEmail})
        
        if(!existadmin){
             return res.status(404).json(new apiError(false , null , 404 , `Admin Not Found!!!`))
        }
        
        const isvalid = await decodedhashpassword(password , existadmin?.password) 

        if(!isvalid){
            return res.status(401).json(new apiError(false , null , 401 ,`Password Not Matching & Invalid Credentials!!!`))
        }
        
        const token = await generateAccesToken({id: existadmin?._id , userNameorEmail: existadmin?.userNameorEmail , role: "admin"})
        
        if(isvalid){
            return res.status(200).cookie("admintoken" , token , { httpOnly: true, secure: true, sameSite: true }).json(new apiResponse(true , {userNameorEmail: existadmin?.userNameorEmail, Token: `bearer ${token}`}, 200 , null , "Admins Login Successfully!!!"))
        }

    } catch (error) {
        return res.status(500).json(new apiError(false , null , 500 , `admin login controller  Error: ${error}`))
    }
}

module.exports = {adminscontroller , adminslogincontroller} 