const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {ordermodel} = require('../Model/order.model.js');
const {usermodel} = require('../Model/User.model.js');
const {invoicemodel} = require('../Model/invoice.model.js')

const successcontroller = async(req , res)=>{
    try {

        const {trans_id} = req.params;
        
        // find invoice with transition id

        const updateinvoice = await invoicemodel.findOneAndUpdate(
            {tran_id: trans_id},
            {payment_status: "success"},
            {new: true}
        )
        
        
        const order = await ordermodel.findOne({_id: updateinvoice.order_id});
        order.paymentinfo.ispaid = true;
        await order.save();
        
        res.redirect(`${process.env.FRONTEND_DOMAIN}/success`)
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `payment success Controller Error: ${error}`))
    }
}

const failedcontroller = async(req , res)=>{
    try {

        const {trans_id} = req.params;
        
        // find invoice with transition id

        const updateinvoice = await invoicemodel.findOneAndUpdate(
            {tran_id: trans_id},
            {payment_status: "Failed"},
            {new: true}
        )
        
        
        const order = await ordermodel.findOne({_id: updateinvoice.order_id});
        order.paymentinfo.ispaid = false;
        await order.save();
        
        res.redirect(`${process.env.FRONTEND_DOMAIN}/fail`)
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Payment Failed Controller Error: ${error}`))
    }
}

const cancelcontroller = async(req , res)=>{
    try {

        const {trans_id} = req.params;
        
        // find invoice with transition id

        const updateinvoice = await invoicemodel.findOneAndUpdate(
            {tran_id: trans_id},
            {payment_status: "Cancel"},
            {new: true}
        )
        
        
        const order = await ordermodel.findOne({_id: updateinvoice.order_id});
        order.paymentinfo.ispaid = false;
        await order.save();
        
        res.redirect(`${process.env.FRONTEND_DOMAIN}/cancel`)
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Payment Cancel Controller Error: ${error}`))
    }
}

module.exports = {successcontroller , failedcontroller , cancelcontroller}