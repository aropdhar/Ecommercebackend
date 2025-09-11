const mongoose = require('mongoose');
const { Schema , Types } = mongoose;


const cartSchema = new Schema({
    product:{
        type: Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
    user:{
        type: Types.ObjectId,
        ref: "users",
    }
});

const cartModel = mongoose.model("cart" , cartSchema);

module.exports = {cartModel}