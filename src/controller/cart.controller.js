const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {cartModel} = require('../Model/cart.model.js');
const {usermodel} = require('../Model/User.model.js')

const creatCartController = async(req , res)=>{
  
    try {
        
        const {product , quantity } = req?.body;

        if(!product){
            return res.status(400).json(new apiError(false , null , 404 , `Product Is Not available`));
        }
        
        const isAlreadyExist = await cartModel.findOne({product: product});
        
        
        if(isAlreadyExist){

            isAlreadyExist.quantity += 1;
            await isAlreadyExist.save();

            return res.status(200).json(new apiResponse(true , isAlreadyExist, 200 , null , "Again Cart Add"));
        }

        const CartAdd = await new cartModel({
             product: product, 
             quantity: quantity,
             user: req?.user?.id, 
        }).save()
        
         

        if(!CartAdd){   
            return res.status(400).json(new apiError(false , null , 404 , `cart Add Failed`))
        }

        const user = await usermodel.findById(req?.user?.id);
        user.cartItem.push(CartAdd?._id);
        await user.save()
        
        return res.status(200).json(new apiResponse(true , CartAdd, 200 , null , "Cart Add create  Successfully!!"))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `cart Controller Error: ${error}`))
    }

}

// get all cart

const GetAllCart = async(req , res)=>{
    try {
        
        const {id} = req.user;

        const allcart = await cartModel.find({user: id}).populate(["product" , "user"]);

        if(allcart){
            return res.status(200).json(new apiResponse(true , allcart, 200 , null , "Get AllCart Successfully!!"))
        }

         return res.status(400).json(new apiError(false , null , 404 , `Cart Not Found`));

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Get AllCart Controller ${error}`));
    }
}


// delete cart item

const DeleteCart = async(req , res)=>{
    try {
        
        const {id} = req.params;
        
        const deletecart = await cartModel.findOneAndDelete({_id: id});

        if(deletecart){
            const usercartdelete = await usermodel.findById(deletecart?.user);
            usercartdelete.cartItem.pull(deletecart._id);
            await usercartdelete.save();
            

            return res.status(200).json(new apiResponse(true , deletecart, 200 , null , "Cart delete  Successfully!!"))
        }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Delete Cart Controller ${error}`));
    }
}

// update cart item

const UpdateCart = async (req , res)=>{
    try {
        
        const {id} = req?.params;
  

        const cartupdate = await cartModel.findOneAndUpdate({_id: id},
        {
           ...req.body
        },
        {
            new: true
        })


        if(cartupdate){
            return res.status(200).json(new apiResponse(true , cartupdate, 200 , null , "Cart Update  Successfully!!"))
        }

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Update Cart Controller ${error}`));
    }
}

module.exports = {creatCartController , GetAllCart , DeleteCart , UpdateCart}