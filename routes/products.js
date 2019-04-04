const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const productsDB = require('../DAL/products');
const categoriesDB = require('../DAL/categories');
const UsersDB = require('../DAL/users');
const authMiddleware = require('../middlewares/authentication');

router.get('/', async (req, res, next)=> {
    const products = await productsDB.getAll().catch(console.error);
    if(!products) next(createError(404));
    else res.send(products);
});


router.get('/:productId', async (req, res, next)=> {
    const product = await productsDB.getById(req.params.productId).catch(console.error);
    if(!product) next(createError(404));
    else res.send(product);
});

router.get('/:productId/category', async (req, res, next)=> {
    const product = await productsDB.getById(req.params.productId).catch(console.error);
    if(!product) return next(createError(404));
    const category = await categoriesDB.getById(product.categoryId).catch(console.error);
    if(!category) next(createError(404));
    else res.send(category);
});

router.get('/:productId/user', async (req, res, next)=> {
    const product = await productsDB.getById(req.params.productId).catch(console.error);
    if(!product) return next(createError(404));
    const user = await UsersDB.getById(product.addedBy).catch(console.error);
    if(!user) next(createError(404));
    else res.send(user);
});

router.use(authMiddleware);

router.post('/', async (req, res, next)=> {
    const product = await productsDB.add(req.body).catch(console.error);
    if(!product) next(createError(400, 'missing inserted data'));
    else res.send(product);
});

router.delete('/:productId', async (req, res, next)=> {
    const product = await productsDB.getById(req.params.productId).catch(console.error);
    if(!product) return next(createError(404));
    if(req.user._id.toHexString() !== product.addedBy) return next(createError(401));
    else await productsDB.delete(req.params.id).catch(console.error);
    res.send("product was deleted successfully");
});

router.patch('/:id', async (req, res, next)=> {
    const product = await productsDB.patch(req.params.id, req.body).catch(console.error);
    if(!product) next(createError(404));
    res.send('product with id: ' + product._id + " was updated successfully");
});



module.exports = router;