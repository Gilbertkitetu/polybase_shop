
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

//setting up config file
dotenv.config({ path: 'server/config/config.env' });

const app = express();

//middleware
import errorMiddleware from './middlewares/errors.js';

//database
import connectDatabase from './config/database.js';

//middleware to handle errors
app.use(errorMiddleware);
app.use(fileUpload());
app.use(cors());

//import all routes
import productsRoute from './routes/product.js';
import userRoute from './routes/user.js';
import orderRouter from './routes/Order.js'; 
import shopsRoute from './routes/Shop.js';
import whatsappRouter from './routes/Whatsapp.js';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'true'}));


//handle uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})


//connecting config file
connectDatabase();


const port = process.env.PORT;

app.get('/api/v1', (req, res) => res.send('Hello there EPSB here'))

app.use('/api/v1', userRoute);
app.use('/api/v1', productsRoute);
app.use('/api/v1', orderRouter);
app.use('/api/v1', shopsRoute);
app.use('/api/v1', whatsappRouter);


const sever = app.listen(port, () => console.log(`EPSB server listening at http://localhost:${port}`));


//handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);
    server.close(()=> {
        process.exit(1)
    })
})