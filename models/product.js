const mongoose = require('../DBL/mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    addedBy: {type: Schema.Types.ObjectId, ref: 'User' , required: true},
    isOnSale: {type: Boolean, required: true},
    price: {type: Number, required: true},
    discount: Number
})

module.exports =  mongoose.model("Product", productSchema);