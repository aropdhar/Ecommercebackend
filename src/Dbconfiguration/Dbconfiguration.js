const mongoose = require('mongoose');
const chalk = require('chalk');
const {DBName} = require('../constant/constant.js')


const Dbconnection= async  () =>{
  try {
     
    const connectioninfo =  await  mongoose.connect(`${process.env.DATABASE_URL} / ${DBName}`);

    console.log(
        chalk.blue.bgGreenBright.bold(`MongoDB Connected !! DB HOST !! ${
          (await connectioninfo).connection.host
        }`)            
      );    
    

  } catch (error) {

    console.log(chalk.bgRedBright(error));
    
  }
}

module.exports = {Dbconnection}
