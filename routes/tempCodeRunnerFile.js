lly adding a product to the cart
router.post('/user/:productId/add', isLoggedIn, async(req, res) => {
    let { productId } = req.params;
    let currUserId = req.user._id;
    let product = await Product.findById(productId);
    let currUser = await User.findById(currUserId);