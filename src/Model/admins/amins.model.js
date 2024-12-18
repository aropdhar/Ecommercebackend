const mongoose = require('mongoose');
const { Schema , Types } = mongoose;


const adminsSchema = new Schema({
    userNameorEmail:{
        type: String,
        trim: true,
        required: [true , "userNameorEmail Missing"]
    },
    password:{
        type: String,
        trim: true,
        required: [true , "password Missing"]
    },
    image:{
        type: String
    }
});

const adminsmodel = mongoose.model("admins" , adminsSchema);
module.exports = {adminsmodel} 