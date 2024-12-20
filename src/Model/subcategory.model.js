const mongoose = require('mongoose');
const { Schema } = mongoose;


const subcategory = new Schema({
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
    product:{
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "category",
        required: [true , "category missing"],
    }]

})

const subcategorymodel = mongoose.model('subcategory', subcategory)

module.exports = {subcategorymodel}