import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { Form, Button, Card , Nav} from 'react-bootstrap';
import axios from "axios";                                       

import GlobalVariables from '../GlobalVariables';


//import style
import './styles/login.css';

//import components
import Signup from './signup';



function Login(){
   
    let navigate = useNavigate();


     //login hooks
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
    

   
    //post to server function
    function handleSubmit (event) {
        event.preventDefault();
        //alert(`Email: ${email} password: ${password}`); 

        var user_login = {
            email : email,
            password : password
        }
        axios.post(` ${GlobalVariables.serverUrl}login`, user_login).then(res => {
            alert(res.data.token)
            ReactSession.setStoreType("localStorage"); 
            ReactSession.set("usertoken", res.data.token);
            ReactSession.set("email", user_login.email);
            alert(ReactSession.get("email"))
            
            navigate.push("/");
        }).then(err => {
            console.log(err)    
        })
    }

    return(
        <>
            <Card style={{ width: '30rem', padding: '20px' }}>
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
                    <div className="w-100 text-center mt-2" style={{color: "black"}}>
                Don't have an Account?  <Nav.Link href="/signup">Sign Up</Nav.Link>
            </div>
                </Card.Body>
            </Card>
           
        </>
    );
}

export default Login;