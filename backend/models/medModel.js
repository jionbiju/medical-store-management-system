import mongoose from "mongoose";

const medSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    expireDate:{
        type:Date,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
}
);

const medModel = mongoose.model('medModel',medSchema);
export default medModel;