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
            return res.status(200).json(new apiResponse(true,offerDateSave,200,null,"offerDate Create Suc cessfully!!!"));
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

module.exports = {offerDatecontroller , getAllOfferDate}