const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const usersDB = require('../DAL/users');

module.exports = router.use(async (req, res, next)=>{
    if(!req.headers.authorization) next(createError(401));
    const isAuth = await User.authenticate(req.headers.authorization).catch(err=> next(createError(401)));
    if(!isAuth) return next(createError(401));
    const user = await usersDB.getById(isAuth.userId);
    if(!user) next(createError(401));
    else 
    {
        req.user = user;
        next();
    }
});