const express = require('express')
const router = express.Router();


const Data = require('../controllers/Data.js');


const { newProduct, getSingleProduct, updateProduct, deleteProduct, getProductUsingSlug } = require('../controllers/product_controller');

// router.get('/get_users', (req, res) => {
//     res.send("This is a get users route");
//     console.log("This is a users route");
// })



router.route('./product/new').post(newProduct);

router.route('./product/:id').get(getSingleProduct);

router.route('./product/:id').put(updateProduct);

router.route('./product/:id').delete(deleteProduct);

//router.route('./products/slug/:slug').get(getProductUsingSlug);



router.get('products/slug/:slug', (req, res) => {

    const product = Data.products.find((x) => x.slug == req.params.slug);
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

router.get('./products', (req, res) => {
    res.send(Data.products);
})
module.exports = router;