import React, { useState } from 'react';

//import style
import './styles/login.css';

function Login(){

    //login hooks
    const[user_email, set_user_email] = useState('');
    const[password, set_password] = useState('');

    //post to server function

    return(
        <div className="login-page">
        <h1>Login</h1>
        <div className="login">
            <div>
                <div>
                <label>Username or email address* </label>
                <input type="text"  className='input-control'
                value={user_email} onChange={(e) => {set_user_email(e.target.value)}}
                />
                </div>

                <div>
                <label>Password* </label>
                <input type="password"  className='input-control'
                value={password} onChange={(e) => {set_password(e.target.value)}}
                />
                </div>
                <div className="checkbox">
                <input type="checkbox"/><label>Remember me</label>
                <p>Forgot password?</p>
                </div>

                <button className="btn-login">Login</button>

                <div><p>Or</p></div>
                <button className="btn-login">Create an Account</button>
            </div>
        </div>
        </div>
    );
}

export default Login;