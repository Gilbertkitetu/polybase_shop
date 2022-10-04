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



export default shopsRoute;

