import React, { useState } from 'react';
//import uniqid from 'uniqid';
import axios from 'axios';

import { Form, Button, Card, Nav } from 'react-bootstrap'


//import style
import './styles/signup.css';

//import components



function Signup( ){

   
    //defining hooks for signing up a new user
    const[user_name, set_user_name] = useState('');
    const[user_email, set_user_email] = useState('');
    const[user_phone_number, set_user_phone_number] = useState('');
    const[user_password, set_user_password] = useState('');


    //post to server function create account
    function handleSubmit (event) {
        event.preventDefault();
        alert(`Email: ${user_email} password: ${user_password} Username: ${user_name}  phone no: ${user_phone_number}`)
        
        var user_account = {
            username : user_name,
            email: user_email,
            phone_number: user_phone_number,
            password: user_password
           
        }
        axios.post(' http://localhost:8000/api/v1/add_new_user', user_account).then(res => {
            alert(res.data)
        }).then(err => {
            console.log(err)
        })

//         var data = JSON.stringify({
//   "username": "Gilbert",
//   "email": "gilbertkitetu1@gmail.com",
//   "phone_number": "0746362456",
//   "password": "12345678",
//   "user_id": "5476547654645",
//   "shop_name": "olling thunder",
//   "location": "nyeri",
//   "date_created": "2/2/2021"
// });

// var config = {
//   method: 'post',
//   url: ' http://localhost:8000/api/v1/add_new_user',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });


    }


    return(
        <>
        <Card style={{ width: '30rem', padding: '20px' }}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="usename">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" required value={user_name} onChange={(e) => {set_user_name(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required value={user_email} onChange={(e) => {set_user_email(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group id="phone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" required value={user_phone_number} onChange={(e) => {set_user_phone_number(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required  value={user_password} onChange={(e) => {set_user_password(e.target.value)}}/>
                    </Form.Group>
                    <Button className="w-100" type="submit">Sign Up</Button>
                </Form>
                <div className="w-100 text-center mt-2" style={{color: "black"}}>
                Already have account? <Nav.Link href="/login">Sign In</Nav.Link>
            </div>
            </Card.Body>
        </Card>
       
        </>
       
    );
}

export default Signup;