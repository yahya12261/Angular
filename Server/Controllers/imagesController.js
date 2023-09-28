const ApiFeatures = require('./../Utils/ApiFeatures');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const CustomError = require('./../Utils/CustomError');
const Image = require('../Models/imagesModel')
const path = require('path');

exports.getProductImageById = asyncErrorHandler(async (req,res,next)=>{
    const id = req.params.id * 1
    const image = await Image.findOne({imageId:id})
    if(!image){
        res.status(404).json({
            status:"fail",
            massage: `Image with that ID : ${id} is not found!`
        })
        const error = new CustomError(`Image with that ID : ${id} is not found!`, 404);        
        return next(error);
    }
    const imagePath = path.join(__dirname, '..', image.imageUrl);
    res.sendFile(imagePath); 

})
