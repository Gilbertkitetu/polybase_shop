import axios from 'axios';
//const { messageTemplates } = require('./public/javascripts/messageTemplates')
//const { products } = require('./public/javascripts/products')

import dotenv from 'dotenv'; //setting up config file
dotenv.config(); //import config.env file

export async function sendWhatsAppMessage(data) {
  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    // url: `https://graph.facebook.com/
    // v15.0/101707402743837/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  console.log(config.url)

  return await axios(config)
}

export  async function getTextMessageInput(recipient, text) {
  return JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": recipient,
    "type": "text",
    "text": {
        "body": text
    }
  })
}

async function updateWhatsAppMessage(data) {
  const config = {
    method: 'put',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
}

function createProductsList(product) {
  return {
    "id": `${product.id}`,
    "title": product.name,
    "description": `$${product.price}`
  }
}

export  function getMessageData(recipient, order) {

  const messageTemplate = messageTemplates[order.statusId - 1]

  let messageParameters

  switch (messageTemplate.name) {
    case 'welcome':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
      ];
      break;
    case 'payment_analysis':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
      ];
      break;
    case 'payment_approved':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
      ];
      break;
    case 'invoice_available':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_picked_packed':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_in_transit':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_delivered':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deadlineDays },
      ];
      break;
  }

  const messageData = {
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: process.env.TEMPLATE_NAME_PREFIX + '_' + messageTemplate.name,
      language: { "code": "en_US" },
      components: [{
          type: "body",
          parameters: messageParameters
        }]}}

  return JSON.stringify(messageData);
}



// module.exports = {
//   sendWhatsAppMessage: sendWhatsAppMessage,
//   getTextMessageInput: getTextMessageInput,
//   updateWhatsAppMessage: updateWhatsAppMessage,
//   listTemplates: listTemplates,
//   createMessageTemplate: createMessageTemplate,
//   getMessageData: getMessageData,
//   createProductsList: createProductsList
// };
