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
        required: true
    },
    Telephone:{
        type: Number,
        unique: true,
        required: true,
        max: [11 , "Max Telephone number 11"]
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
    Policy:{
        type: Boolean,
        required: [true , "policy Missing"]
    },
    Acess_Token:{
        type: String,
    },
    Role:{
        type:Array,

    }
    
})