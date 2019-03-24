const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

module.exports = router.use(async (req, res, next)=>{
    if(!req.headers.authorization) next(createError(401));
    const isAuth = await User.authenticate(req.headers.authorization).catch(err=> next(createError(401)));
    if(!isAuth) next(createError(401));
    else
    {
        res.userId = isAuth.userId;
        next();
    }
});