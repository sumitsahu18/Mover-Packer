import mongoose from "mongoose";

const cateSchema = mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
    required: [true,"category name is required"],
    lowercase:true,
    trim: true,
    },
    catIconnm:{
      type:String,
    required: [true,"category icon name is required"],
    trim: true,
    }
})

const userCategorySchema = mongoose.model('user_cate_collection',cateSchema);

 export default userCategorySchema