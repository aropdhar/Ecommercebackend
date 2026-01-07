const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');
const {cartModel} = require('../Model/cart.model.js');
const {usermodel} = require('../Model/User.model.js');


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

// increment cart controller

const incrementcart = async (req , res)=>{
    try {
        
        const {id} = req.params;

        const cartincrement = await cartModel.findOne({_id: id});

        cartincrement.quantity += 1;
        await cartincrement.save()
        
        if(!cartincrement){
            return res.status(400).json(new apiError(false , null , 404 , `cart increment Failed`));
        }

        return res.status(200).json(new apiResponse(true , cartincrement, 200 , null , "Cart Increment  Successfully!!"))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `increment cart Controller ${error}`));
    }
}

// decrement cart controller

const  decrementcart = async (req , res)=>{
    try {
        
      const {id} = req.params;

      const cartdecrement = await cartModel.findOne({_id: id});
      
      if(cartdecrement.quantity > 1){
          cartdecrement.quantity -= 1;
          await cartdecrement.save()
      }

     
      if(!cartdecrement){
        return res.status(400).json(new apiError(false , null , 404 , `cart decrement failed`));
      }

      return res.status(200).json(new apiResponse(true , cartdecrement, 200 , null , "Cart Decrement  Successfully!!"))

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Decrement Cart Controller ${error}`));
    }
}

// user wise controller 

const cartuserwise = async(req , res)=>{
    try {
        
        const userid = req.user;
        const AllcartItem = await cartModel.find({user: userid.id}).populate(["product" , 'user']);
        
        if(!AllcartItem){
           return res.status(400).json(new apiError(false , null , 401 , `Cart Not Found`)); 
        }

        const subtotal = AllcartItem.reduce((initialvalue , item)=>{
            const {quantity , product} = item;
            initialvalue.totalAmount += parseFloat(product.price.replace(/,/gi , "")* quantity);
            initialvalue.quantity += quantity;

            return initialvalue;

        } , {
            quantity: 0,
            totalAmount: 0
        })
        
        return res.status(200).json(new apiResponse(true , {cart: AllcartItem , totalprice: subtotal.totalAmount , totalquantity: subtotal.quantity}, 200 , null , "Cart Item  Successfully!!"));


    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Cart User Wise Controller ${error}`));
    }
}


module.exports = {creatCartController , GetAllCart , DeleteCart , UpdateCart , incrementcart , decrementcart , cartuserwise}