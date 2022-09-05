import express from 'express'
const productsRoute = express.Router();

import products from '../models/products.js';



//const { newProduct, getSingleProduct, updateProduct, deleteProduct, getProductUsingSlug } = require('../controllers/product_controller');

// router.get('/get_users', (req, res) => {
//     res.send("This is a get users route");
//     console.log("This is a users route");
// })



// router.route('./product/new').post(newProduct);

// router.route('./product/:id').get(getSingleProduct);

// router.route('./product/:id').put(updateProduct);

// router.route('./product/:id').delete(deleteProduct);

//router.route('./products/slug/:slug').get(getProductUsingSlug);
productsRoute.post('/products/add_n_product', (req, res) => {
    const new_product = products.create(req.body);
    console.log(req.body)
    res.status(201).json({
        success: true,
        data: "Product Added Successfully"
    })
})


productsRoute.get('/products/slug/:slug', (req, res) => {

    products.findOne({ slug : req.params.slug, function (err, product){
        if(product) {
            res.json(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    }});
  
});

productsRoute.get('/get_products', async(req, res) => { 
   try{
   const allproducts = await products.find();
     return res.json(allproducts);  
    } catch (error){
        res.json({ message: error})
}
})

export default productsRoute;