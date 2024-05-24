const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');
const router = express.Router();

//route to see the cart
router.get('/user/cart', isLoggedIn, async(req, res) => {
    let currUserId = req.user._id;
    let user = await User.findById(currUserId).populate('cart');

    res.render('cart/cart', {user})
})

//actually adding a product to the cart
router.post('/user/:id/add', isLoggedIn, async(req, res) => {
    let { id } = req.params;
    let currUserId = req.user._id;
    let product = await Product.findById(id);
    let currUser = await User.findById(currUserId);

    currUser.cart.push(product);
    currUser.save();
    res.redirect('/user/cart')
})



module.exports = router;
