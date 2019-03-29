const mongoose = require('../DBL/mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: String,
    categoryId: String,
    addedBy: {type: String, required: true},
    isOnSale: {type: Boolean, required: true},
    price: {type: Number, required: true},
    discount: Number
})

module.exports =  mongoose.model("Product", productSchema);