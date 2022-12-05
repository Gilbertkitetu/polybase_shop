import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { Form, Button, Card , Nav} from 'react-bootstrap';
import axios from "axios";                                       

import GlobalVariables from '../GlobalVariables';
import { Helmet } from 'react-helmet-async';

import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';


//import style
import './styles/login.css';

//import components
import Signup from './signup';



function Login(){
   
    let navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
   

     //login hooks
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
    
        const { state, dispatch: ctxDispatch } = useContext(Store);
        const { userInfo } = state;

        const submitHandler = async (e) => {
            e.preventDefault();
            try {
                const { data } = await axios.post(`${GlobalVariables.serverUrl}login`, {
                    email,
                    password,
                });
                ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate(redirect || '/');
            } catch (err) {
                toast.error(getError(err));
            }
        };

        useEffect(() => {
            if (userInfo) {
                navigate(redirect);
            }

        }, [navigate, redirect, userInfo]);
   

    return(
        <>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
            <Card style={{ width: '30rem', padding: '20px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"  required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"  required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Button className="w-100" variant='success' type="submit">Sign In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2" style={{color: "black"}}>
                Don't have an Account?  <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>
            </div>
                </Card.Body>
            </Card>
           
        </>
    );
}

export default Login;