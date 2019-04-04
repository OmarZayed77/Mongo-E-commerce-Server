const Category = require('../models/category');



module.exports = {
    getAll(){
        return Category.find();
    },
    getById(categoryId){
        return Category.findById(categoryId);
    },
    getProducts(categoryId){
        return Category.findById(categoryId).populate('products');
    },
    add(category){
        return Category.create(category);
    },
    delete(categoryId){
        return Category.findByIdAndDelete(categoryId);
    },
    patch(categoryId ,updatedCategory){
        return Category.findByIdAndUpdate(categoryId, updatedCategory);
    }
}