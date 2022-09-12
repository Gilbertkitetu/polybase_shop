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
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
            phone_number: String,
            paybill: String,
            account_number: String,
            till_number: String,
            
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user_id: {
            type: String,
            required: true
        },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
        
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;