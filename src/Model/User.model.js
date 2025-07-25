const mongoose = require('mongoose');
const { Schema } = mongoose;


const userschema = new Schema({
    FirstName:{
        type: String,
        required: [true , "Firstname Missing!!"],
        trim: true,
        max: [25 , "Max Name size 25 character"],
        min: [3 , "min Name size 3 character"]
    },
    LastName:{
        type: String,
        trim: true,
        max: [15 , "Max Name size 25 character"],
        min: [3 , "min Name size 3 character"]
    },
    Email_Adress:{
        type: String,
        unique: true,
        required: [true , "EmailAddress Missing!!"]
    },
    Telephone:{
        type: String,
        required: [true, "Telephone Number Is missing"]
    },
    Adress1:{
        type: String,
        required: [true , "Adress1 Missing!!"],
    },
    Adress2:{
        type: String,

    },

    City:{
        type: String,
        required: [true , "City Missing!!"], 
    },

    Postcode:{
        type: Number,
        max: [4 , "Invalid Post Code max size 4!!"],
        min: [4 , "min postcode 4 digit!!"]
    },
    Division:{
        type: Number,

    },
    District:{
        type: String,
    },
    Password:{
        type: String,
        required: [true , "password Missing!!"],
        trim: true
    },
    Role:{
        type:String,
        enam: ['admin' , 'users' , 'marchant'],
        default: 'users'
    },
    OTP:{
        type: Number
    },
    resetOTP: {
        type: Number,
    },
    userIsVerifid: {
        type: Boolean,
        default: false,
    },
    Token:{
        type: String,
    },
    avatar:{
        type: String
    }
    
},
{ timestamps: true }
)


const usermodel = mongoose.model('users' , userschema)

module.exports = {usermodel}