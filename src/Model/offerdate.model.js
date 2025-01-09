const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerdateSchema = new Schema({
    offerdateName:{
      type: String,
      required: true,
      trim: true
    },
    offerDate:{
        type: Number,
        required: true,
        default: 1
    }
});

const offerDateModel = mongoose.model("offerdate" , offerdateSchema);

module.exports = {offerDateModel}