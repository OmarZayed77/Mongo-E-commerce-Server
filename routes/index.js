const createError = require('http-errors');
var express = require('express');
var router = express.Router();
var User = require("../models/user");
const authMiddleware = require('../middlewares/authentication');

router.get('/', function(req, res, next) {
  res.send('Home Page');
});

router.post('/login', async function(req, res, next){
  if(!req.body.userName || !req.body.password) return next(createError(401 , 'Authentication Failed'));
  const user = await User.findOne({"userName": req.body.userName}).catch(console.error);
  if(!user) return next(createError(401 , 'Authentication Failed'));
  debugger; 
  if(await user.verifyPassword(req.body.password).catch(console.error)) res.send({token: await user.generateToken().catch(console.error) });
  else next(createError(401 , 'Authentication Failed'));
});

router.get('/profile', authMiddleware,function(req, res, next) {
  res.send({"message" :  `your profile id : ${res.userId}`});
});

module.exports = router;
