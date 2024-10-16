const nodemailer = require("nodemailer");

const sendMailer = async (Email_Adress) =>{
    try {
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true, 
            auth: {
              user: process.env.HOST_MAIL,
              pass: process.env.HOST_PASS,
            },
          });
          

          const info = await transporter.sendMail({
            from: process.env.HOST_MAIL,
            to: Email_Adress, 
            subject: "aropsutradhar202✔", 
            text: "Hello world?", 
            html: "<b>Hello world?</b>",
          });
        
         return info;

    } catch (error) {
        
        console.log("From Send Failed:" + error);
        
    }
}

module.exports = {sendMailer}