import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    slug : {
        type: String,
        required: [true, 'slug mising']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [6, 'Product price cannot exceed 6 figures'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    product_details: {
        type: String
    },
    brand: {
        type: String
    },
    latitude: {
        type: String,
        require: true
    },
    longitude: {
        type: String,
        required: true
    },
    product_location: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    imagesrc: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    shop_name: {
        type: String,
    },
    countInStock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product stock number cannot exceed 5 characters'],
        default: 0
    },
    numberReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                
            },
            rating: {
                type: Number,
                
            },
            comment: {
                type: String,
                
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
     
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
        
    }
    
})

const products = mongoose.model('Product', productSchema);

export default products;

