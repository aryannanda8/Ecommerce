const express = require('express')
const router = express();
let { isLoggedIn } = require('../../middleware')
const User = require('../../models/user')

router.post('/product/:productId/like', isLoggedIn, async(req, res) => {
    let { productId } = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);

    const option = isLiked ? '$pull' : '$addToSet'; //mongodb operations

    req.user = await User.findByIdAndUpdate(req.user._id, {[option]: {wishList:productId}}, {new:true})
    //new = true isliye coz jab bhi findByIdAndUpdate karte ho, to new document aaye, purana nhi
    res.send('like done')
})


module.exports = router;