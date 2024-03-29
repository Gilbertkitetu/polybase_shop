const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsynErrors');
const APIFeatures = require('../utils/apiFeatures');

const Data = require('./Data.js');


//create a new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

//get all products => /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors (async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query)

            .search()
            .filter()


    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: product.length,
        products
    })
})


//Get single product details => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404));

    }
    res.status(200).json({
        success: true,
        product
    })
}) 


//update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})


//delete product => /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    await product.remove();

    res.status(200).json({
    success: true,
    message: 'Product deleted succefully.'
    });
})



// exports.getProductUsingSlug = catchAsyncErrors (async (req, res, next) => {

//     const product = await Data.products.find((x) => x.slug == req.params.slug);
//     if(product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ message: 'Product Not Found' });
//     }
// });