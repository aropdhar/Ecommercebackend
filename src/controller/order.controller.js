const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {ordermodel} = require('../Model/order.model.js');
const {cartModel} = require('../Model/cart.model.js');
const {usermodel} = require('../Model/User.model.js');
const {invoicemodel} = require('../Model/invoice.model.js')
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE == "false" //true for live, false for sandbox
const crypto = require('crypto');
const path = require('path');

const placeorder = async (req , res) =>{
    try {
        
        const {customerinfo , paymentinfo} = req.body;
        const userinfo = req.user;
        const bearertoken = req.headers.cookie.replace('acesstoken=' , '');
        const {phone, address1 , city , district} = customerinfo;
        const {paymentmathod} = paymentinfo;
        
        
        if(!phone || !address1 || !city || !district || !paymentmathod){
         return res.status(400).json(new apiError(false , null , 404 , `Billing And Payment credential Missing!!!`))
        }
        
        const response = await fetch(`${process.env.BACKEND_URL}/userwisecart` ,{
            headers:{
                "Content-Type": "application/json",
                 Authorization: `Bearer ${bearertoken}`,
            },
        })

        const data = await response.json();
        const {cart , totalprice , totalquantity} = data?.data
        
        const cartItemid = cart.map((item)=>{
            return item._id;
        })
        
        let trans_id = crypto.randomUUID().split('-')[0];
        const generateOrderId = () => {
           return 'FWB' + Math.floor(100000000 + Math.random() * 900000000);
        };


        if(paymentmathod.toLocaleLowerCase() == "cash".toLocaleLowerCase()){
            const saveorder = await new ordermodel({
                uniqueId: generateOrderId(),
                user: userinfo.id,
                cartItem: cartItemid,
                customerinfo: customerinfo,
                paymentinfo: paymentinfo,
                subtotal: totalprice,
                totalquantity: totalquantity
            }).save();

            // now save invoice to db
            
            const invoice = await new invoicemodel({
               user_id: req.user.id,
               payment_status: "Pending",
               delivery_status: "Pending",
               cus_details: customerinfo,
               tran_id: `COD${trans_id}`, 
               total: totalprice,
               vat: 2,
               payable: parseInt((totalprice * 2) / 100),
               order_id: saveorder._id,
            }).save()

            res.json({saveorder: saveorder})

        }else if(paymentmathod.toLocaleLowerCase() == "online".toLocaleLowerCase()){


            const data = {
                total_amount: 100,
                currency: 'BDT',
                tran_id: `Trans_id${trans_id}`, // use unique tran_id for each api call
                success_url: 'http://localhost:4000/api/v1/success/' + trans_id,
                fail_url: 'http://localhost:4000/api/v1/fail/' + trans_id,
                cancel_url: 'http://localhost:4000/api/v1/cancel/' + trans_id,
                ipn_url: 'http://localhost:4000/api/v1/ipn' + trans_id,
                shipping_method: 'Courier',
                product_name: 'Computer.',
                product_category: 'Electronic',
                product_profile: 'general',
                cus_name: 'Customer Name',
                cus_email: 'customer@example.com',
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: '01711111111',
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            const apiResponse = await sslcz.init(data);
            if(!apiResponse){
                return res.status(400).json(new apiError(false , null , 404 , `Payment Initialised Error`))
            }

            // console.log(apiResponse.GatewayPageURL);
            
            
             const saveorder = await new ordermodel({
                uniqueId: generateOrderId(),
                user: userinfo.id,
                cartItem: cartItemid,
                customerinfo: customerinfo,
                paymentinfo: paymentinfo,
                subtotal: totalprice,
                totalquantity: totalquantity
            }).save();

             // now save invoice to db
            
            await new invoicemodel({
               user_id: req.user.id,
               payment_status: "Pending",
               delivery_status: "Pending",
               cus_details: customerinfo,
               total: totalprice,
               tran_id: `COD${trans_id}`, 
               vat: 2,
               payable: parseInt((totalprice * 2) / 100),
               order_id: saveorder._id,
            }).save()

           return res.status(200).json({saveorder: saveorder , payemntURl: apiResponse.GatewayPageURL})
           
        }

    } catch (error) {
         return res.status(400).json(new apiError(false , null , 404 , `PlaceOrder Controller Error: ${error}`))
    }
}

// get all order 

const gellAllOrder = async (req , res)=>{
    try {
        
        const {status , range} = req.query;

        let filter = {}
        
        if(status && status !== "all"){
            filter.status = status;           
        }
        
        if(range && range !== "all"){
            const today = new Date();
            
            
            let startDate;

            if(range === "today"){
                startDate = new Date(today)
                
                startDate.setHours(0, 0, 0, 0)           
            }
            else if(range === "this-week"){
                startDate = new Date(today)

                startDate.setDate(today.getDate() - today.getDay())
                startDate.setHours(0, 0, 0, 0)           
            }

            else if(range === "this-month"){
                startDate = new Date(today.getFullYear(),today.getMonth(),1)

                startDate.setHours(0, 0, 0, 0)
            }
            
            else if(range === "this-year"){
                startDate = new Date(today.getFullYear(), 0 ,1);
                startDate.setHours(0, 0, 0, 0)
            }

            if(startDate){
                filter.createdAt = {
                    $gte: startDate,
                    $lte: today,
                };
            }
        } 

        const AllOrder = await ordermodel.find(filter).populate('user').populate({ path: 'cartItem', populate: { path: 'product' }}).sort({ createdAt: -1 });

        if(AllOrder){
            return res.status(200).json(new apiResponse(true , AllOrder , 200 , null , "Cart Item  Successfully!!"));
         }

        return res.status(400).json(new apiError(false , null , 404 , `All Order Not Found`))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `get All Controller Error: ${error}`))
    }
}


// get user order

const userorder = async(req , res)=>{
    try {
        
        const userid = req.user;
        
        const userbyorder = await ordermodel.find({user: userid?.id});

        if(!userbyorder?.length){
           return res.status(400).json(new apiError(false , null , 404 , `User Order Not Found`)) 
        }

        return res.status(200).json(new apiResponse(true , userbyorder, 200 , null , "User Order Item  Successfully!!"));
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `User Order Controller Error: ${error}`))
    }
}

// cancel user order

const cancelUserOrder = async(req , res)=>{
    try {
        
        const {orderId} = req.params;
        const {id} = req.user;

        const cancelorder = await ordermodel.findOne({_id: orderId , user: id});
        cancelorder.status = "Cancel";
        await cancelorder.save();
        
        
        if(!cancelorder){
           return res.status(400).json(new apiError(false , null , 404 , `Cancel User Order Not SuccessFully!!!!`))
        }

        return res.status(200).json(new apiResponse(true ,cancelorder , 200 , null , "user Order Cancel  Successfully!!"));
        

        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Cancel User Order Controller Error: ${error}`))
    }
}

// single order 

const SingleOrderController = async(req , res)=>{
    try {
        const {id} = req.params;
        const SingleGetOrder = await ordermodel.findById({_id: id}).populate('user').populate({path: 'cartItem' , populate:{path: "product"}});

        if(!SingleGetOrder){
            return res.status(400).json(new apiError(false , null , 404 , `Single Order  Successfully!!`))
        }

        return res.status(200).json(new apiResponse(true ,SingleGetOrder , 200 , null , "Single Order  Successfully!!"));
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Single Order Controller Error: ${error}`))
    }
}

module.exports = {placeorder , gellAllOrder , userorder , cancelUserOrder , SingleOrderController}