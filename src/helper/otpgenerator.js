const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

const makeotp =async () =>{
  
    return aleaRNGFactory(new Date()).uInt32().toString().slice(0 , 4);
    
}

module.exports = {makeotp}