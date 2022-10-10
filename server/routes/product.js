import express from 'express'
import expressAsyncHandler from 'express-async-handler';
const productsRoute = express.Router();


import path from 'path';
import products from '../models/products.js';
const __dirname = path.resolve();





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

productsRoute.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await products.find().distinct('category');
    res.send(categories);
})
);

const PAGE_SIZE = 15;
productsRoute.get(
    '/search',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';



        const queryFilter = searchQuery && searchQuery !== 'all' ? {
            productname: {
                $regex: searchQuery,
                $options: 'i',
            },
        } : {};

        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter = rating && rating !== 'all' ? {
            rating: {
                $gte: Number(rating),
            },
        } : {};

        const priceFilter = price && price !== 'all' ? {
            price: {
                $gte: Number(price.split('-')[0]),
                $lte: Number(price.split('-')[1]),
            },
        } : {};

        const sortOrder =
        order === 'featured'
          ? { featured: -1 }
          : order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
          ? { rating: -1 }
          : order === 'newest'
          ? { createdAt: -1 }
          : { _id: -1 };
  
          

      const Products = await products.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      const countProducts = await products.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      });
    //   const Products = ProductsBeforeSort.sort((a, b) =>
    //    Number(distance(query.latitude, query.longitude, a.latitude, a.longitude)) -
    //     Number(distance(query.latitude, query.longitude, a.latitude, a.longitude))
    //    );

      
      res.send({
        Products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize),
      });

    })

)

productsRoute.get(
    '/getShopProducts',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const Products = await products.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await products.countDocuments();
        res.send({
            Products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

productsRoute.put(
    '/editproducts/:id',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await products.findById(productId);
        if(product) {
            product.productname = req.body.productname,
            product.slug = req.body.slug,
            product.price = req.body.price,
            product.imagesrc = req.body.imagesrc;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            await product.save();
            res.send({ message: 'Product Updated' });
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    })
)

productsRoute.delete (
    '/deleteProduct/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await products.findById(req.params.id);
        if (product) {
            await product.remove();
            res.send({ message: 'Product Deleted Successfully' })
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    })
)

export default productsRoute;