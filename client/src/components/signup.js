import React, { useState } from 'react';

import { Form, Button, Card } from 'react-bootstrap'


//import style
import './styles/signup.css';

//import components



function Signup( ){

   
    //defining hooks for signing up a new user
    const[user_name, set_user_name] = useState('');
    const[user_email, set_user_email] = useState('');
    const[user_phone_number, set_user_phone_number] = useState('');
    const[user_password, set_user_password] = useState('');


    //post to server function
    function handleSubmit (event) {
        alert(`Email: ${user_email} password: ${user_password} Username: ${user_name}  phone no: ${user_phone_number}`)
    }


    return(
        <>
        <Card>
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
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" style={{color: "white"}}>
                Already have account? Sign In
            </div>
        </>
       
    );
}

export default Signup;