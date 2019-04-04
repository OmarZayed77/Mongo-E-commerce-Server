const mongoose = require('../DBL/mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const salt = 10;
const secretKey= process.env.SECRET_KEY || "Omar";

const signToken = promisify(jwt.sign);
const verifyToken = promisify(jwt.verify);

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},
{
    autoIndex: true,
    toJSON: {
        transform: true,
        hide: ['password', '__v']
    }
});

userSchema.options.toJSON.transform = function (doc, ret, options) {
    if(options.hide && options.hide.length > 0)
    {
        options.hide.forEach(p => delete ret[p]);
    }
    return ret;
}

userSchema.pre('save', async function(){
    if(this.isNew || this.modifiedPaths().includes('password'))
    {
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.method('verifyPassword', async function(password){
    return bcrypt.compare(password, this.password);
});

userSchema.method('generateToken', async function(){
    return signToken({userId : this._id}, secretKey);
});

userSchema.static('authenticate', async function(token){
    const auth = await verifyToken(token, secretKey);
    return auth;
})

module.exports =  mongoose.model("User", userSchema);