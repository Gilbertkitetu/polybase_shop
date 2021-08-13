const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    user_name: String,
    email: String,
    phone_number: String,
    password: String,
    user_id: String,
    shop_name: String,
    location: String,
    date_created: String
})


const userModel = mongoose.model('users_collection', userSchema);

module.exports = userModel;