import express from 'express'
const productsRoute = express.Router();

import path from 'path';
const __dirname = path.resolve();

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
productsRoute.post('/products/add_product', (req, res) => {
    const new_product = products.create(req.body);
    console.log(req.body)
    res.status(201).json({
        success: true,
        data: "Product Added Successfully"
    })
})
productsRoute.post('/products/uploadphoto', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    const file = req.files.file;

    let filename1 = `${Date.now()}.${file.name}`;
    
    file.mv(`../client/public/uploads/products/${filename1}`, err => {
        if(err) {
            console.error(err);
            return res.status(500).send(err);
        }
        //let product = req.body.productData;
        //req.body.imagesrc = `/uploads/products/${file.name}`
        
        //console.log(JSON.stringify(product))
        //console.log(JSON.parse(product))
        
        res.json({
             fileName: file.name,
             filePath: `/uploads/products/${filename1}`,
            
            })
    })
})

productsRoute.post('/products/addproduct', (req, res) => {
    
    const new_product = products.create(req.body);
    console.log(req.body)
    res.status(201).json({
        success: true,
        data: "Product Added Successfully"
    })
})

productsRoute.get('/products/slug/:slug', async (req, res) => {

   const product = await products.findOne({ slug: req.params.slug });
   if(product) {
    res.send(product);
   } else {
 res.status(404).send({ message: 'Product Not Found'});
   }
  
});

productsRoute.get('/products/:_id', async (req, res) => {
    const product = await products.findOne({ _id: req.params._id });
    if (product) {
        res.send(product);
    }else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})

productsRoute.get('/get_products', async(req, res) => { 
   try{
   const allproducts = await products.find();
     return res.json(allproducts);  
    } catch (error){
        res.json({ message: error})
}
})

export default productsRoute;