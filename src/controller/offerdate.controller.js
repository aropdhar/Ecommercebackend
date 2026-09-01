const { offerDateModel } = require('../Model/offerdate.model.js');
const {apiError} = require('../utils/apiError.js');
const {apiResponse} = require('../utils/apiResonse.js');


const offerDatecontroller = async(req , res)=>{
    try {
        const {offerdateName , offerDate} = req?.body;

        if(!offerdateName || !offerDate){
            return res.status(400).json(new apiError(false , null , 404 , `Offerdate Credential Missing`))
        }

        const isexistofferdate = await offerDateModel.find({offerdateName: offerdateName});

        if(isexistofferdate?.length){
            return res.status(400).json(new apiError(false , null , 404 , `offerdate ${offerdateName} Already Exist`))
        }

        // offerDate database check

        const offerdatedatabase = await offerDateModel.find({});
        if(offerdatedatabase.length >= 2){
            return res.status(400).json(new apiError(false , null , 404 , `offerDate Must Be 2`))
        }

        const offerDateSave = await new offerDateModel({
            offerdateName,
            offerDate
        }).save();

        if(offerDateSave){
            return res.status(200).json(new apiResponse(true,offerDateSave,200,null,"Offer Date Create Successfully!!!"));
        }

        return res.status(400).json(new apiError(false , null , 404 , `OfferDate Create Failed!!`));
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `offerDate controller  Error: ${error}`))
    }
}

// get all offerdate

const getAllOfferDate = async (req , res)=>{
    try {

        const getAllOfferDate = await offerDateModel.find({});
        if(getAllOfferDate){
            return res.status(200).json(new apiResponse(true,getAllOfferDate,200,null,"get AllOfferDate Successfully!!!"));
        }
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `getAllOfferDate controller Error: ${error}`))
    }
}

const deleteoffer = async(req , res)=>{
    try {
        const {id} = req.params;

        const deleteitem = await offerDateModel.findOneAndDelete({_id: id});

        if(!deleteitem){
            return res.status(400).json(new apiError(false , null , 404 , `Delete Offer Not Found`))
        }else{
            return res.status(200).json(new apiResponse(true,deleteitem,200,null,"Offer Date Deleted Successfully!!!"));
        }
        

    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Delete Offer Controller Error: ${error}`))
    }
}

const updateoffer = async(req , res)=>{
    try {
        const {id} = req.params;

        const updateitem = await offerDateModel.findOneAndUpdate({_id: id},
            {
                ...req.body
            },{
                new: true
            });

        if(updateitem){
            return res.status(200).json(new apiResponse(true,updateitem,200,null,"Offer Date Updated Successfully!!!"));
        }
        
        
    } catch (error) {
        return res.status(400).json(new apiError(false , null , 404 , `Updated Offer Controller Error: ${error}`))
    }
}


module.exports = {offerDatecontroller , getAllOfferDate , deleteoffer , updateoffer}