const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {ordermodel} = require('../Model/order.model.js');
const {cartModel} = require('../Model/cart.model.js');
const {usermodel} = require('../Model/User.model.js');

const paymentcontroller = async(req , res)=>{
    try {
              
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `payment Controller Error: ${error}`))
    }
}

module.exports = {paymentcontroller}