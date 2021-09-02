import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'




//import style
import './styles/login.css';

//import components
import Signup from './signup';



function Login(){


     //login hooks
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');

   
    //post to server function
    function handleSubmit (event) {
        alert(`Email: ${email} password: ${password}`)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Button className="w-100" type="submit">Sign In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2" style={{color: "white"}}>
                Don't have an Account? Sign Up
            </div>
        </>
    );
}

export default Login;