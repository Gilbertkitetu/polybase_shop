import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';

import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import dotenv from 'dotenv'; //setting up config file

dotenv.config(); //import config.env file


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
        seller: req.body.seller,

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
        const orders = await Order.find({ user_id: req.body.user_id })
        .sort({ createdAt: 'desc' }).exec();
        res.send(orders);
    })
);

orderRouter.post(
    '/orders/shopOrders',

    expressAsyncHandler(async (req, res) => {
        const shopOrders = await Order.find({ seller: req.body.seller })
        .sort({ createdAt: 'desc' }).exec();
        res.send(shopOrders)
    })
)

orderRouter.get("/token", (req, res) => {
    generateToken();
})
//Middleware
let token
const generateToken = async (req, res, next) => {

    const secret = "GKHSSSG2NmiKv5wU";
    const consumer = "vZbcPEwBRu7ytVaMEAg0HSYKF8E1nbdW";

    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");
    await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                authorization : `Basic ${auth}`,
            },
        }).then((response) => {
            console.log(response.data.access_token);
            token = response.data.access_token
            next();
        }).catch((err) => {
            console.log(err);
            //res.status(400).json(err.message)
        })
}

orderRouter.post(
    '/stk', generateToken,
    expressAsyncHandler(async (req, res) => {
        const phone_number = req.body.phone;
        const amount = parseInt(req.body.totalPrice);
        const orderId = req.body.orderid
        
        
        const date = new Date();
        const timestamp = 
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2);

            const shortcode = "174379" //paybill
            const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

            const password = new Buffer.from(shortcode + passkey + timestamp).toString(
                "base64"
            );

            await axios.post(
                "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                {
                    BusinessShortCode: 174379,    
                    Password: password,    
                    Timestamp: timestamp,    
                    TransactionType: "CustomerPayBillOnline",    
                    Amount: amount,    
                    PartyA: `254${phone_number}`,  
                    //PartyA : "600983", 
                    PartyB: 174379,
                    //PartyB: "600000",
                    PhoneNumber: `254${phone_number}`,    
                    CallBackURL: "https://341b-217-21-116-238.ngrok.io/api/v1/callback",    
                    AccountReference:"Test",    
                    TransactionDesc:"Test"  
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((response) => {
                console.log(response.data)
                res.status(200).json(response.data)
            }).catch((err)=>{
                console.log(err)
                res.status(400).json(err.message)
            })
           
    })
)

orderRouter.post(
    '/callback', async (req, res) => {
        const callbackData = req.body;
        console.log(callbackData.body);

        if(!callbackData.Body.stkCallback.CallbackMetadata) {
            console.log(callbackData.Body);
            return res.json("ok")
        }

        console.log(callbackData.Body.stkCallback.CallbackMetadata)

        const phone = callbackData.Body.stkCallback.CallbackMetadata.Item[4].value;
        const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].value;
        const transaction_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].value;

        console.log({ phone, amount, transaction_id });

        //const orderId = req.body.orderid
        const order = await Order.findById(orderId);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.Now();
            
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    }
)


export default orderRouter

