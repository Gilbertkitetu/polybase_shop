import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';

import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import dotenv from 'dotenv'; //setting up config file
import { getTextMessageInput, sendWhatsAppMessage } from '../messageHelper.js'

dotenv.config({ path: 'server/config/config.env' }); //import config.env file


const whatsappRouter = express.Router();

whatsappRouter.post('/sendText', function(req, res, next) {
    console.log("Hi whatsappp")
    //var data = getTextMessageInput(process.env.RECIPIENT_PHONE_NUMBER, "Welcome to EPSB")
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": process.env.RECIPIENT_PHONE_NUMBER,
        "type": "text",
        "text": {
            "body": "Welcome to EPSB"
        }
      });
    console.log(data)
   sendWhatsAppMessage(data).then (function(response){
        return
    }).catch(function(error){
        console.log(error);
        return;
    })
})

whatsappRouter.post('/orderNotification', function(req, res, next) {
    var order = req.body.order;
    var shopname = req.body.shopname;
    console.log("Hi whatsappp")
    // var order = {
    //     shippingAddress: {
    //         latitude: "-0.3974645",
    //         longitude: "36.9648429",
    //         fullName: "gilbert kitetu",
    //         address: "Nyeri",
    //         city: "Nyeri",
    //         country1: "Kenya",
    //         county1: "Mombasa"
    //     },
    //     isPaid: false,
    //     isDelivered: false,
    //     _id: "636dbf08500ecb38bc55e811",
    //     orderItems: [
    //         {
    //             _id: "63261bd6c4716629688a29d6",
    //             price: 156999,
    //             productname: "Lenovo IdeaPad Gaming 3 15IHU6, Core I7 11th Gen, 16GB Ram, 1TB HDD + 256GB SSD,DOS -Shadow Black",
    //             slug: "Lenovo_IdeaPad_Gaming_3_15IHU6,_Core_I7_11th_Gen,_16GB_Ram,_1TB_HDD_+_256GB_SSD,DOS_-Shadow_Black",
    //             imagesrc: "/uploads/products/1663441878197.gaminglaptop.jpg",
    //             quantity: 1,
    //             product: "63261bd6c4716629688a29d6"
    //         }
    //     ],
    //     paymentMethod: "Mpesa",
    //     itemsPrice: 156999,
    //     shippingPrice: 0,
    //     taxPrice: 23549.85,
    //     totalPrice: 180548.85,
    //     user_id: "6319ceb7d1e6180a243a5237",
    //     seller: "6319ceb7d1e6180a243a5237",
    //     createdAt: "2022-11-11T03:18:32.865Z",
    //     updatedAt: "2022-11-11T03:18:32.865Z",
    //     __v: 0
    // }
    //var data = getTextMessageInput(process.env.RECIPIENT_PHONE_NUMBER, "Welcome to EPSB")
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": process.env.RECIPIENT_PHONE_NUMBER,
        "type": "text",
        "text": {
            "body": `*Welcome to EPSB,*
            You have placed an order to *${shopname}*
            Here is your *order Details*:
            *Order Id:* ${order._id},
            *Total Price:* Ksh${order.totalPrice},
             *Order Items:* ${order.orderItems[0].productname},
             *Seller:* ${shopname},
             *For more order details visit:
              
             https://bcab-217-21-116-238.ngrok.io/api/v1/orders/${order._id}
                `
        }
      });
    console.log(data)
   sendWhatsAppMessage(data).then (function(response){
        return
    }).catch(function(error){
        console.log(error);
        return;
    })
})

whatsappRouter.post('/sendProduct', function(req, res, next) {
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": process.env.RECIPIENT_PHONE_NUMBER,
        "type": "template",
        "template": {
          "name": "sample_movie_ticket_confirmation",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "header",
              "parameters": [
                {
                  "type": "image",
                  "image": {
                    "link": "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/90/643837/1.jpg"
                  }
                }
              ]
            },
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": "Adidas TENSAUR SPORT TRAINING HOOK AND LOOP SHOES KIDS"
                },
                {
                  "type": "date_time",
                  "date_time": {
                    "fallback_value": "Adidas TENSAUR SPORT TRAINING HOOK AND LOOP SHOES KIDS"
                  }
                },
                {
                  "type": "text",
                  "text": "Adidas TENSAUR SPORT TRAINING HOOK AND LOOP SHOES KIDS"
                },
                {
                  "type": "text",
                  "text": "4,454"
                }
              ]
            }
          ]
        }
      }
      );

    sendWhatsAppMessage(data).then(function (response) {
        return;
    }).catch(function (error) {
        console.log(error.response.data)
        return;
    })
})


export default whatsappRouter
