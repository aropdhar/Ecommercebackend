const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryschema = new Schema({
    title:{
        type: String,
        required: [true , "category missing"],
        trim: true
    },
    description:{
        type: String,
        required: [true , "description missing"],
        trim: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }],
    isActive:{
        type: Boolean,
        default: false 
    },
    subcategory: [{
        type: Schema.Types.ObjectId,
        ref: "subcategory"
    }]
});

const categorymodel = mongoose.model("category" , categoryschema)

module.exports = {categorymodel}