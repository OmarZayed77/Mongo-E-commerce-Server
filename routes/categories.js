const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const categoriesDB = require('../DAL/categories');
const productsDB = require('../DAL/products');
const authMiddleware = require('../middlewares/authentication');

router.get('/', async (req, res, next)=> {
    const categories = await categoriesDB.getAll().catch(console.error);
    if(!categories) next(createError(404));
    else res.send(categories);
});


router.get('/:categoryId', async (req, res, next)=> {
    const category = await categoriesDB.getById(req.params.categoryId).catch(console.error);
    if(!category) next(createError(404));
    else res.send(category);
});

router.get('/:categoryId/products', async (req, res, next)=> {
    const products = await productsDB.getByCategoryId(req.params.categoryId).catch(console.error);
    if(!products) next(createError(404));
    else res.send(products);
});

router.post('/', authMiddleware,async (req, res, next)=> {
    const category = await categoriesDB.add(req.body).catch(console.error);
    if(!category) next(createError(400, 'missing inserted data'));
    else res.send( "category added with id: " + category._id);
});

router.delete('/:id', authMiddleware,async (req, res)=> {
    const category = await categoriesDB.delete(req.params.id).catch(console.error);
    if(!category) next(createError(404));
    res.send('category with id: ' + category._id + " was deleted successfully");
});

router.patch('/:id', authMiddleware,async (req, res, next)=> {
    const category = await categoriesDB.patch(req.params.id, req.body).catch(console.error);
    if(!category) next(createError(404));
    res.send('category with id: ' + category._id + " was updated successfully");
});


module.exports = router;