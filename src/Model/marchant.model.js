const mongoose = require('mongoose');
const { Schema } = mongoose

const storeSchema = new Schema({
   email:{
     type: String,
     unique: true,
     trim: true,
     required: [true , "Email Missing"]
   },
   
   phoneNumber:{
     type: Number,
     trim: true,
     required: [true , "Phone Number Missing"] 
   },

   storename:{
     type: String,
     trim: true,
     required: [true , "Store Name Required"]
   },

   address: {
    type: String,
    trim: true,
   },

   users:{
    type: Schema.Types.ObjectId,
    ref: "users"
   },

   product:{
    type: Schema.Types.ObjectId,
    ref: "product"
   },

   status:{
    type: String,
    enam: ["pending" , "Rejected" , "Approved"],
    default: "pending"
   },

},
  {timestamps: true}
)

const storemodel = mongoose.model("marchant" , storeSchema);

module.exports = {storemodel}