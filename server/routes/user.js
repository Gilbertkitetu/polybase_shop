import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import expressAsyncHandler from 'express-async-handler'



import mongoose from 'mongoose';

import userModel from '../models/user_model.js'

// Verify token
function  verifyToken(req, res, next) {
    //Get auth header value 
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

router.post('/login', expressAsyncHandler( async (req, res) => {

    //mock user
    // const user = {
    //     id: 1,
    //     username: 'Gilbert',
    //     email: 'gilbertkitetu1@gmail.com'
    // }
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
        //check user password with the hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
           // res.status(200).json({ message: "Valid password" })
            jwt.sign({ user: user }, 'mysecretkey', { expiresIn: '30d'},(err, token) => {
                console.log(token);
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone_number: user.phone_number,
                    token: token
                });
                return
            });
        
        }else{
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    }else{
        res.status(401).json({ error: "User does not exist" });
    }

    
    //res.send("This is the login route")
}));

// router.post('/create-shop', (req, res) => {
//     jwt.verify(req.token, 'mysecretkey', (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//         }else {
//             res.json({
//                 message: 'Shop Created succesfully',
//                 authData
//             });
//         }
//     });
  
// });

router.get('/get_users', (req, res) => {
    res.send("This is a get users route");
    console.log("This is a users route");
})


router.post('/add_new_user', async (req, res) => {

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    //set password to hasahed password
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const new_user = new userModel({
        name : req.body.name,
        email : req.body.email,
        phone_number : req.body.phone_number,
        password: req.body.password,
        
        location: req.body.location,
        date_created: req.body.date_created,
        date_updated: req.body.date_updated
    })

    new_user.save(function (err) {
        if(!err) {
            res.send("New user added successfully");
            console.log("New user added successfully");
        } else {
            res.send(err)
        }
    })
});

router.put(
    `/profile`,
    expressAsyncHandler(async (req, res) => {
        const user = await userModel.findById(req.body._id);
        if(user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                // user.password = bcrypt.hashSync(req.body.password, 10)
                  //generate salt to hash password
                const salt = await bcrypt.genSalt(10);
                //set password to hasahed password
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();
            jwt.sign({ user: user }, 'mysecretkey', { expiresIn: '30d'},(err, token) => {
                console.log(token);
                res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: token

            })
        })
        
        }else {
            res.status(404).send({ message: "User not found" })
        }
    })
)




export default router;