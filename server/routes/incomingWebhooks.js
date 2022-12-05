import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import axios from 'axios';

import { isAuth } from '../utils.js';
import dotenv from 'dotenv'; //setting up config file

dotenv.config(); //import config.env file

const verificationToken = process.env.WEBHOOK_VERIFICATION_TOKEN;

const webHookRouter = express.Router();



webHookRouter.get('/webhook/verify', function (req, res, next) {
    if (
      req.query['hub.mode'] == 'subscribe' &&
      req.query['hub.verify_token'] == verificationToken
    ) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
  });


webHookRouter.post('/webhook/verify', async function (req, res, next) {
   
  
    console.log("request header X-Hub-Signature validated");
  
    const body = req.body.entry[0].changes[0];
  
    // Verify this is from the messages webhook, not other updates
    if(body.field !== 'messages'){
      // not from the messages webhook so dont process
      return res.sendStatus(400)
    }
  
    if(body.value.hasOwnProperty("messages")) {
  
      // Mark an incoming message as read
      try {
        let sendReadStatus = messageStatuses.read;
        sendReadStatus.message_id = body.value.messages[0].id;
        const readSent = await sendWhatsAppMessage(sendReadStatus);
        console.log(readSent);
      } catch (error) {
        console.log(error);
      }
  
      body.value.messages.forEach(processMessage);
    }
  
    res.sendStatus( 200 );
  
  });


  
async function processMessage(message) {
    const customerPhoneNumber = message.from;
    const messageType = message.type;
  
   
    
  }

export default webHookRouter