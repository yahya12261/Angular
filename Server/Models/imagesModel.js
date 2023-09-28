const mongoose = require('mongoose');

const imageSchema  = new mongoose.Schema({
    imageId : {
         type:Number, 
         unique : true , 
         require : true ,  
    },
    name : {
        type:String , 
    },
    imageUrl : {
        type:String
    }
})
const Image = mongoose.model('image', imageSchema);
module.exports = Image;
