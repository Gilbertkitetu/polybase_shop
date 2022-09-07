import React, { useState, useContext, useEffect} from 'react';
//import uniqid from 'uniqid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalVariables from '../GlobalVariables';
import { Form, Button, Card, Nav } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

//import style
import './styles/signup.css';

//import 



function Signup( ){
    const navigate = useNavigate();
    
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
   
    //defining hooks for signing up a new user
    const[user_name, set_user_name] = useState('');
    const[user_email, set_user_email] = useState('');
    const[user_phone_number, set_user_phone_number] = useState('');
    const[user_password, set_user_password] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    //post to server function create account
    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert(`Email: ${user_email} password: ${user_password} Username: ${user_name}  phone no: ${user_phone_number}`)
        
        var user_account = {
            name : user_name,
            email: user_email,
            phone_number: user_phone_number,
            password: user_password,
            
            location: "",
            date_created: Date.now(),
            data_updated: Date.now()
           
        }
        // axios.post(`${GlobalVariables.serverUrl}add_new_user`, user_account).then(res => {
        //     alert(res.data)
        // }).then(err => {
        //     console.log(err)
        // })
        try {
            const { data } = await axios.post(`${GlobalVariables.serverUrl}add_new_user`, user_account);
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
        }
    }
useEffect(() => {
    if(userInfo) {
        navigate(redirect);
    }
}, [navigate, redirect, userInfo]);


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
                Already have an account? <Link to={`/login?redirect=${redirect}`}>Sign In</Link>
            </div>
            </Card.Body>
        </Card>
       
        </>
       
    );
}

export default Signup;