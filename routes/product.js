const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { validateProduct , isLoggedIn, isSeller, isAuthor } = require('../middleware');
const {showAllProducts, productForm , createProduct , showProduct , editProductForm , updateProduct , deleteProduct} =  require('../controllers/product')

router.get('/products', showAllProducts);

router.get('/products/new', isLoggedIn, productForm);

router.post('/products',isLoggedIn, isSeller, validateProduct,createProduct);

router.get('/products/:id', isLoggedIn, showProduct);

router.get('/products/:id/edit', isLoggedIn, editProductForm);

router.patch('/products/:id', isLoggedIn, validateProduct, isAuthor, updateProduct);

router.delete('/products/:id', isLoggedIn, isAuthor, deleteProduct);

module.exports = router;