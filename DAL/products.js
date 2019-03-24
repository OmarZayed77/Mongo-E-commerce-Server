const Product = require('../models/product');

module.exports = {
    getAll(){
        return Product.find();
    },
    getById(productId){
        return Product.findById(productId);
    },
    getByCategoryId(categoryId)
    {
        return Product.find({"categoryId": categoryId})
    },
    getByUserId(userId)
    {
        return Product.find({"addedBy": userId})
    },
    add(product){
        return Product.create(product);
    },
    delete(productId){
        return Product.findByIdAndDelete(productId);
    },
    patch(productId ,updatedproduct){
        return Product.findByIdAndUpdate(productId, updatedproduct);
    }
}