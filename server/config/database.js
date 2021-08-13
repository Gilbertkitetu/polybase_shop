const mongoose = require('mongoose');




const dotenv = require('dotenv'); //setting up config file

dotenv.config({ path: './config.env' });



const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/polybase', {
        useNewUrlParse: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then (con => {
        console.log(`MongoDB database connected with HOST: ${con.connection.host}`);

    })
}


module.exports = connectDatabase;