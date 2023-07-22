import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:String,
    category:String,
    price:Number
})

export const porductModel=mongoose.model('Product',productSchema);

export const createProduct = (values: Record<string, any>) => new porductModel(values).save().then((user) => user.toObject());
export const getProduct=porductModel.find();