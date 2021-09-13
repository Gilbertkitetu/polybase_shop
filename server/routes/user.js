const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require("bcrypt");


const mongoose = require('mongoose');

const userModel = require('../models/user_model');

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

router.post('/login', async (req, res) => {

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
            jwt.sign({ user: user }, 'mysecretkey', { expiresIn: '1h'},(err, token) => {
                console.log(token);
                res.json({
                    token: token
                });
            });
        
        }else{
            res.status(400).json({ error: "Invalid Password" });
        }
    }else{
        res.status(401).json({ error: "User does not exist" });
    }

    
    //res.send("This is the login route")
});

router.post('/create-shop', verifyToken, (req, res) => {
    jwt.verify(req.token, 'mysecretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        }else {
            res.json({
                message: 'Shop Created succesfully',
                authData
            });
        }
    });
  
});

router.get('/get_users', (req, res) => {
    res.send("This is a get users route");
    console.log("This is a users route");
})


router.post('/add_new_user', async (req, res) => {
    //res.send("Add new user -route");
    if(!(req.body.username && req.body.email && req.body.phone_number && req.body.password)){
        return res.status(400).send({ error: "Data not formatted correctly"});
    }

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    //set password to hasahed password
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const new_user = new userModel({
        username : req.body.username,
        email : req.body.email,
        phone_number : req.body.phone_number,
        password: req.body.password,
        user_id: req.body.user_id,
        shop_name: req.body.shop_name,
        location: req.body.location,
        date_created: req.body.date_created
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


module.exports = router;