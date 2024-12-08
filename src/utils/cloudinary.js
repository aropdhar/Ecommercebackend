 const fs = require("fs");
 const cloudinary = require("cloudinary").v2


 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloudinary = async (localfilepath = 'public\\temp\\chatting ui.png') =>{
    try {
        const uploadResult = await cloudinary.uploader
        .upload(
            localfilepath || 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            }
        )
        console.log(uploadResult); 

        fs.unlinkSync(`${localfilepath}` , (err)=>{
            console.log("image unlinksync error" , err);   
        })
    } catch (error) {
        console.log("Cloudinary Upload Error:" , error);
        
    }

}

module.exports = {uploadcloudinary}