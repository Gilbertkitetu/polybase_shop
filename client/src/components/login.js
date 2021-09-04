import React, { useState } from 'react';
import { Form, Button, Card , Nav} from 'react-bootstrap'




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