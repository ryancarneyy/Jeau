import { useState } from "react";
// import CreateUser from "../CreateUser/CreateUser";
import { Link, useNavigate } from 'react-router-dom';

import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '' 
    });

    // Updates loginInfo useState every keystroke
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo({
            ...loginInfo, 
            [ name ] : value
        });
    }

    // handles when login button is pressed
    const handleSubmit = (event) => {
         // keeps form data from being wiped
        event.preventDefault();
        console.log('Login Attempt with info: ', loginInfo)
        fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
        .then(res => {
            // response status in 200-299
            if (!res.ok) {
                throw new Error(`Error authenticating user: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            navigate('/home');
        })
        .catch( err => {
            console.error('Error with fetch operation:', err);
            alert('Error fetching user')
        })
    }

    return (
        <>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-input">
                    <label>Username: </label>
                    <input
                    type='text'
                    name='username'
                    onChange={handleInputChange} />
                </div>
                <div className="login-input">
                    <label>Password: </label>
                    <input
                    type='text'
                    name='password'
                    onChange={handleInputChange} />
                </div>
                <button type='submit'>Login</button>
            </form>
            <nav>
                <ul>
                    <li><Link to='/account'>Sign Up!</Link></li>
                    <li><Link to='/home'>Show users!</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Login;