
const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

//settinh up config file
dotenv.config({ path: 'server/config/config.env' });

//const userRoute = require('./routes/user');




const app = express();


//middleware
//const errorMiddleware = require('./middlewares/errors');


//database
const connectDatabase = require('./config/database');


//middleware to handle errors
//app.use(errorMiddleware);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true'}));


//handle uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})



//import all routes
//const products = require('./routes/product');

//app.use('/api/v1', products);


//connecting config file
connectDatabase();


const port = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello there'))

const sever = app.listen(port, () => console.log(`polybase server listening at http://localhost:${port}`));


//handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);
    server.close(()=> {
        process.exit(1)
    })
})