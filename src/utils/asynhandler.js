const {apiError} = require('./apiError.js')

const asynhandler = (fun = () =>{})=>{
    return async (req , res , next)=>{
        try {
            await fun(req , res , next);
        } catch (error) {
           new apiError(false , null , 400 , "asyhandler error" + error)
        }
    }
}

module.exports = {asynhandler}