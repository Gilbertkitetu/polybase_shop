import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email: String,
    phone_number: String,
    password: String,
    
    location: String,
    date_created: String,
    date_updated: String
})


const userModel = mongoose.model('users_collection', userSchema);

export default userModel;