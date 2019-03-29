const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const usersDB = require('../DAL/users');
const productsDB = require('../DAL/products');
const authMiddleware = require('../middlewares/authentication');

router.post('/', async (req, res, next)=> {
    const user = await usersDB.add(req.body).catch(console.error);
    if(!user) next(createError(400));
    else res.send( "user added with id: " + user._id);
});

router.use(authMiddleware);

router.get('/', async (req, res, next)=> {
   const users = await usersDB.getAll().catch(console.error);
   if(!users) next(createError(404));
   else res.send(users); 
});


router.get('/:userId', async (req, res, next)=> {
    const user = await usersDB.getById(req.params.userId).catch(console.error);
    if(!user) next(createError(404));
    else res.send(user);
});

router.get('/:userId/products', async (req, res, next)=> {
    const products = await productsDB.getByUserId(req.params.userId).catch(console.error);
    if(!products) next(createError(404));
    else res.send(products);
});

router.delete('/:id', async (req, res)=> {
    const user = await usersDB.delete(req.params.id).catch(console.error);
    if(!user) next(createError(404));
    res.send('user with id: ' + user._id + "was deleted successfully");
});

router.patch('/:id', async (req, res, next)=> {
    if(req.user._id.toHexString() !== req.params.id) return next(createError(401));
    const user = await usersDB.patch(req.params.id, req.body).catch(console.error);
    if(!user) next(createError(400));
    else res.send('user with id: ' + user._id + "was updated successfully");
});

module.exports = router;