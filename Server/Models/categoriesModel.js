const mongoose = require('mongoose');
const fs = require('fs')
const Counter = require ('./counterModel')  
const categorySchema  = new mongoose.Schema({
        categoryId :{
        type:Number,
    
        unique:true,
        required: [true, 'categoryId is required field!'],
        default:0
    },
       name: {
        type:String,
        unique: true,
        required: [true, 'name is required field!'],
      },
      description: {
        type:String,
        required: [true, 'description is required field!'],
        trim:true
      },
      icon:{
        type:String,
        required: [true, 'icon is required field!'],
        trim:true
      }
})
categorySchema.pre('save', function(next) {
    Counter.findOneAndUpdate(
        { _id: 'categoryId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
        )
        .then((counter) => {
             this.categoryId = counter.seq*1;
             next();
            })
        .catch((err) => {
            console.log(err)
            return next(err);
            });
})
categorySchema.post('save', function(doc, next){
    const content = `A new Product document with name ${doc.name} has been created \n`;
    fs.writeFileSync('./Log/log.txt', content, {flag: 'a'}, (err) => {
        console.log(err.message);
    });
    next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;