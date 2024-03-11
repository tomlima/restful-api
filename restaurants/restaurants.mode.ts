import mongoose, { mongo } from "mongoose";

export interface MenuItem extends mongoose.Document{
    name: string,
    price: number
}

export interface Restaurant extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number, 
        require: true
    }
})

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    menu: {
        type: [menuSchema],
        require: false,
        select: false,
        default: []
    }
})

export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema)