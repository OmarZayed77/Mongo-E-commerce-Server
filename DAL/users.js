const createError = require('http-errors');
const User = require('../models/user');

module.exports = {
    getAll(){
        return User.find();
    },
    getById(userId){
        return User.findById(userId);
    },
    getProducts(userId){
        return User.findById(userId).populate('products');
    },
    add(user){
        return User.create(user);
    },
    delete(userId){
        return User.findByIdAndDelete(userId);
    },
    async patch(userId ,updatedUser){
        const user =  await User.findById(userId);
        Object.assign(user, updatedUser);
        return await user.save();
    }
}