import React, { useState } from 'react';




//import style
import './styles/signup.css';

//import components



function Signup( { isShowCreateAccount }){

   
    //defining hooks for signing up a new user
    const[user_name, set_user_name] = useState('');
    const[user_email, set_user_email] = useState('');
    const[user_phone_number, set_user_phone_number] = useState('');
    const[user_password, set_user_password] = useState('');


    //post to server function



    return(
        <div className="sign-up">
            <h1>Create Account</h1>
            <div className="sign">
                <div>

                    <label>User name: </label>
                    <input type="text" placeholder="Enter your username" className="input-control"
                    value={user_name} onChange={(e) => {set_user_name(e.target.value)}}
                    />

                    <label>Email: </label>
                    <input type="text" placeholder="Enter your email address" className="input-control"
                    value={user_email} onChange={(e) => {set_user_email(e.target.value)}}
                    />

                    <label>Phone number: </label>
                    <input type="text" placeholder="Enter your phone number" className="input-control"
                    value={user_phone_number} onChange={(e) => {set_user_phone_number(e.target.value)}}
                    />

                    <label>Password: </label>
                    <input type="password" placeholder="Enter your password" className="input-control"
                    value={user_password} onChange={(e) => {set_user_password(e.target.value)}}
                    />

                    <button className="btn-create-account">Create Account</button>


                </div>
            </div>
        </div>
    );
}

export default Signup;