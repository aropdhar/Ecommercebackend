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
        let secure_link = []
        for(let imagepath of localfilepath){
            const uploadResult = await cloudinary.uploader
            .upload(
                imagepath?.path || 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                }
            )
    
            fs.unlinkSync(`${imagepath?.path}` , (err)=>{
                console.log("image unlinksync error" , err);   
            })
    
          secure_link.push(uploadResult?.secure_url);
            
            
        }
        
        return secure_link;
        
       
        
    } catch (error) {
        console.log("Cloudinary Upload Error:" , error);
        
    }

}

// delete cloudinary

const deleteCloudinaryAssets = async(imagepath)=>{

    try {
         
        for(let cloudinarName of imagepath){
            const allarr = (cloudinarName.split('/'));
            const cloudimagename = (allarr[allarr?.length - 1].split('.')[0]);
            const deleteitem = await cloudinary.api
            .delete_resources(cloudimagename || ['entkozxzcn7zjhx6bjdb'], 
                { type: 'upload', resource_type: 'image' })        
        }
        
    } catch (error) {
        console.log("delete Cloudinary Error:" , error);
    }
}

module.exports = {uploadcloudinary , deleteCloudinaryAssets}