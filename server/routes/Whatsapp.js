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

whatsappRouter.post('/sendOrderNotification', function(req, res, next) {

  var order = req.body.order;
  var shopname = req.body.shopname;
  var phone = req.body.userPhone;
  var allowedphone = process.env.RECIPIENT_PHONE_NUMBER;
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": allowedphone,
        "type": "template",
        "template": {
          "name": "order_notification ",
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
                    // "link": `${process.env.FRONTENDURL}/uploads/products/1663525335495.asus.jpg`
                    "link": "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/98/991607/1.jpg"
                  }
                }
              ]
            },
            {
              "type": "body",
              "parameters": [
                {
                  "type": "text",
                  "text": shopname
                },
                {
                  "type": "text",
                  "text": order._id
                },
                {
                  "type": "text",
                  "text": order.totalPrice
                },
                {
                  "type": "text",
                  "text": order.orderItems[0].productname
                },
                {
                  "type": "text",
                  "text": `${process.env.CALLBACK_URL}/api/v1/orders/${order._id}`
                }
              ]
            }
          ]
        }
      }
      );
    console.log(data)

    sendWhatsAppMessage(data).then(function (response) {
        return;
    }).catch(function (error) {
        console.log(error.response.data)
        return;
    })
})


export default whatsappRouter
