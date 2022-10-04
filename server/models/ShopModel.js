import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    shop_name: {
        type: String,
        required: true
    },
    shop_phone_number: {
        type: String,
        required: true
    },
    shop_email: {
        type: String,
        required: true
    },
    bussinessCategory: {
        type: String,
        required: true
    },
    shopLocation: {
        type: String,
        required: true
    },
    country1: {
        type: String,
        required: true
    },
    county1: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    mpesaName: {
        type: String,
        required: true
    },
    mpesaNumber: {
        type: String,
        required: true
    },
    tillNumber: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true
    },
    krapin: {
        type: String,
        required: true
    },
    user_id: {
   
        type : String, 
         index : { unique : true,
            dropDups : true }
     
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date
    }

}
)

const Shops = mongoose.model('Shops', shopSchema);

export default Shops;