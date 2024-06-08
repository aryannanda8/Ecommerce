const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');
const router = express.Router();

//route to see the cart
router.get('/user/cart' , isLoggedIn , async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price , 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user, totalAmount , productInfo });
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
