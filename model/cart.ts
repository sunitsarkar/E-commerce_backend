import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    quantity:Number,
    isBought:Boolean
})

export const cartModel=mongoose.model('cart',cartSchema);

export const createCartProduct = (values: Record<string, any>) => new cartModel(values).save().then((product) => product.toObject());
