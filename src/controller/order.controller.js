const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {ordermodel} = require('../Model/order.model.js');
const {cartModel} = require('../Model/cart.model.js');
const {usermodel} = require('../Model/User.model.js');

const placeorder = async (req , res) =>{
    try {
        
        const {customerinfo , paymentinfo} = req.body;
        const userinfo = req.user;
        const bearertoken = req.headers.authorization;
        const {phone, address1 , city , district} = customerinfo;
        const {paymentmathod} = paymentinfo;
       
        
        
        if(!phone || !address1 || !city || !district || !paymentmathod){
         return res.status(400).json(new apiError(false , null , 404 , `Billing And Payment credential Missing!!!`))
        }
        
        const response = await fetch(`${process.env.BACKEND_URL}/userwisecart` ,{
            headers:{
                "Content-Type": "application/json",
                Authorization: bearertoken,
            },
        })

        const data = await response.json();
        const {cart , totalprice , totalquantity} = data?.data
        
        const cartItemid = cart.map((item)=>{
            return item._id;
        })
        

        if(paymentmathod == "cash"){
            const saveorder = await new ordermodel({
                user: userinfo.id,
                cartItem: cartItemid,
                customerinfo: customerinfo,
                paymentinfo: paymentinfo,
                subtotal: totalprice,
                totalquantity: totalquantity
            }).save()
            res.json({saveorder: saveorder})
        }
        
        

    } catch (error) {
         return res.status(400).json(new apiError(false , null , 404 , `PlaceOrder Controller Error: ${error}`))
    }
}

module.exports = {placeorder}