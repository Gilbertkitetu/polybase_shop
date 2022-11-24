import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                slug: { type: String, required: true },
                productname: { type: String, required: true },
                quantity: { type: Number, required: true },
                imagesrc: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            latitude: { type: String, required: true },
            longitude: { type: String, required: true },
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
           
            country1: { type: String, required: true },
            county1: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentDetails: {
            phone_number: { type: String},
            transactions_id: { type: String},
            amount: { type: String},
            time: { type: String}
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user_id: {
            type: String,
            required: true
        },
        seller: { type: String, required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: String },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
        paidby: { type: String },
        amountPaid: { type: String },
        transaction_id: { type: String },
        
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;