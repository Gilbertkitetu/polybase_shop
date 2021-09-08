const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken')

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

router.post('/login', (req, res) => {

    //mock user
    const user = {
        id: 1,
        username: 'Gilbert',
        email: 'gilbertkitetu1@gmail.com'
    }

    jwt.sign({ user: user }, 'mysecretkey', { expiresIn: '1h'},(err, token) => {
        res.json({
            token: token
        });
    });

    //res.send("This is the login route")
})

app.post('/create-shop', verifyToken, (req, res) => {
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


router.post('/add_new_user', (req, res) => {
    //res.send("Add new user -route");

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