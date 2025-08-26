const nodemailer = require("nodemailer");
const {MakeTemplate} = require('../helper/Template.js')

const sendMailer = async (FirstName , otp , Email_Adress = "aropsutradhar@gmail.com") =>{
    try {
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true, 
            auth: {
              user: process.env.HOST_MAIL,
              pass: process.env.HOST_APP_PASSWORD,
            },
          });
          

          const info = await transporter.sendMail({
            from: process.env.HOST_MAIL,
            to: `${Email_Adress}`, 
            subject: "E-Commerce✔", 
            html: MakeTemplate(FirstName , otp , Email_Adress),
          });
        
         return info;

    } catch (error) {
        
        console.log("From Send Failed:" + error);
        
    }
}

module.exports = {sendMailer}