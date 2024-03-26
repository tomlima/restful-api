import mongoose from 'mongoose'

export interface Product extends mongoose.Document {
  name: string
  price: Number
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  }
})

export const Product = mongoose.model<Product>('Product', productSchema)
