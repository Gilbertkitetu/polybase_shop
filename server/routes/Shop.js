import express from 'express';
import Shops from '../models/ShopModel.js';

const shopsRoute = express.Router();


shopsRoute.post('/shops/create-shop', (req, res) => {
    const new_shop = Shops.create(req.body);
   
    res.status(201).json({
        success: true,
        data: new_shop,
        message: "Product Added Succesfully"
    })
})

shopsRoute.post('/shops/getShopbyuserid', async (req, res) => {
    console.log(req.body._id)
    const shop = await Shops.findOne({ user_id : req.body._id });
    if(shop) {
        res.send(shop)
    } else {
        res.status(404).send({ message: 'Shop Not Found Create One' })
    }
})
shopsRoute.put('/shops/visit', async (req, res) => {
    const shop = await Shops.findOne({ user_id : req.body.id });
    if(shop) {
        if(!shop.visits){
        shop.visits =  1;
        }else {
            shop.visits = shop.visits + 1;
        }


        const updateshop = await shop.save()
    res.send({ message: 'Visit added', shop: updateshop })
    } else {
        res.status(404).send({ message: 'Shop Not Found' })
    }
    
})

shopsRoute.get('/shops/getAll', async (req, res) => {
    const shops = await Shops.find({});
    res.send(shops)
})

shopsRoute.delete('/shops/deleteShop/:id', async (req, res) => {
    const shop = await Shops.findById(req.params.id);
    if(shop) {
        const deleteShop = await shop.remove();
        res.send({ message: 'Shop Deleted', shop: deleteShop })
    } else {
        res.status(404).send({ message: 'Shop Not Found' })
    }
})

export default shopsRoute;

