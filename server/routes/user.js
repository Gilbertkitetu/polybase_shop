const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const userModel = require('../models/user_model');



router.get('/get_users', (req, res) => {
    res.send("This is a get users route");
    console.log("This is a users route");
})


router.post('/add_new_user', (req, res) => {
    res.send("Add new user -route");

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