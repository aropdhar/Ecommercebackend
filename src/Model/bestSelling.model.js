const mongoose = require('mongoose');
const { Schema , Types } = mongoose;

const bestSellingProductschema = new Schema({
    product:{
        type: Types.ObjectId,
        ref: "product"
    }
});

const bestsellingModel = mongoose.model("bestsellingproduct", bestSellingProductschema);

module.exports = {bestsellingModel}