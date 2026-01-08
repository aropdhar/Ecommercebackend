const mongoose = require('mongoose');
const { Schema , Types } = mongoose;

const orderSchema = new Schema({

    user:{
        type: String,
        required: true
    },
    cartItem:[{
       type: Types.ObjectId,
       ref: "cart"
    }],
    customerinfo:{
        firstname: {
            type: String,
            trim: true
        },
        lastname:{
            type: String,
            trim: true 
        },
        email:{
            type: String,
            trim: true 
        },
        phone:{
            type: Number,
            required: true
        },
        address1:{
            type: String,
            trim: true,
            required: true
        },
        address2:{
            type: String,
            trim: true
        },
        city:{
            type: String,
            trim: true,
            required: true,
            default: "Dhaka"
        },
        district:{
            type: String,
            trim: true,
            required: true
        },
        postcode:{
            type:Number
        }

    },
    paymentinfo:{
        paymentmathod:{
            type: String,
            required: true
        },
        ispaid:{
            type: String,
            default: false
        }
    },
    status:{
        type: String,
        enam: ['pending' , 'processing' , 'delivered' , 'Cancel'],
        default: 'pending',
        required: true,
        trim: true
    },
    subtotal:{
        type: Number,
        default: 0
    },
    totalquantity:{
        type: Number
    }
},
{timestamps: true}
)

const ordermodel = mongoose.model("order" , orderSchema);

module.exports = {ordermodel}