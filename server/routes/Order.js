import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/placeOrder',
    
    expressAsyncHandler(async (req, res) => {
        const newOrder = new Order({

        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user_id: req.body.user_id,

        });
        

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order });


    })
);

orderRouter.get(
    '/orders/:id',
    
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "Order Not Found" })
        }
    })
)

orderRouter.put(
    '/orders/:id/pay',

    expressAsyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                phone_number: req.body.phone_number
            };

            const updateOrder = await order.save();
            res.send({ message: 'Order Paid', order: updateOrder })
        } else {
            res.status(404).send({ message: 'Order Not Found' })
        }
        
    })
)

orderRouter.post(
    '/orders/myorders',

    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user_id: req.body.user_id });
        res.send(orders);
    })
);

orderRouter.post(
    '/orders/shopOrders',

    expressAsyncHandler(async (req, res) => {
        const shopOrders = await Order.find({ shop_id: req.body.shop_id })
    })
)

export default orderRouter

