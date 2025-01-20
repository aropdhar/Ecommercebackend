const mongoose = require('mongoose');
const { Schema , Types } = mongoose;

const flashsaleSchema = new Schema({
    productId:{
        type:Types.ObjectId,
        ref: "product",
        require: true
    },
    offerDate:{
        type: Types.ObjectId,
        ref: "offerdate"
    }
})

const flashsaleModel = mongoose.model("flashsale" , flashsaleSchema);

module.exports = {flashsaleModel}