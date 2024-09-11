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
    const [incorrectUser, setIncorrectUser] = useState(false);
    const [accountLocked, setAccountLocked] = useState(false);
    const [accountLockWarning, setAccountLockWarning] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(10);

    // Updates loginInfo useState every keystroke
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo({
            ...loginInfo, 
            [ name ] : value
        });
    }

    // handles when login button is pressed
    const handleSubmit = async (event) => {
         // keeps form data from being wiped
        event.preventDefault();
        // console.log('Login Attempt with info: ', loginInfo)
        await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo),
            credentials: 'include'
        })
        .then(res => {
            // response status in 200-299
            if (!res.ok) {
                if(res.status !== 401) {
                    throw new Error(`Error authenticating user: ${res.status}`);
                }
            }
            // console.log('Response cookies', document.cookie);
            return res.json();
        })
        .then(data => {
            if (data.status === 401) {
                setAttemptsLeft(data.numAttempts);
                if(attemptsLeft-1 <= 5) {
                    setAccountLockWarning(true);
                    if(accountLockWarning && attemptsLeft-1 === 0) {
                        setAccountLockWarning(false);
                        setAccountLocked(true);
                        setIncorrectUser(false);
                        throw new Error('Error authenticating user, account now locked');
                    }
                }
                else {
                    setAccountLockWarning(false);
                }
                throw new Error(`Error authenticating user: ${data.status}`);
            }
            if (data.token) {
                console.log('Login successful');
                // navigate(`/profile/${data.username}`);  
                navigate('/home');
            }
        })
        .catch(err => {
            // console.error('Error with fetch operation:', err);
            // 403 if account is locked
            if(err.message === 'Error authenticating user: 403') {
                setAccountLocked(true);
                setIncorrectUser(false);
            }
            else if (err.message !== 'Error authenticating user, account now locked') {
                setAccountLocked(false);
                setIncorrectUser(true);
            }
        })
    }

    return (
        <div className="login-page">
            <div className="login-div login-header-div">
                <h1 className="login-header">Jeau</h1>
            </div>
            <div><form onSubmit={handleSubmit}>
                <div className="login-div login-input-div">
                    {/* <label>Username: </label> */}
                    <input
                    className="login-input"
                    type='text'
                    placeholder="Username"
                    name='username'
                    onChange={handleInputChange} />
                </div>
                <div className="login-div login-input-div">
                    {/* <label>Password: </label> */}
                    <input
                    className="login-input"
                    type='text'
                    placeholder="Password"
                    name='password'
                    onChange={handleInputChange} />
                </div>
                {incorrectUser ? <p className='login-div' style={{color: '#EE4B2B', fontWeight: 'bold'}}>Incorrect username or password</p> : null}
                {accountLockWarning ? <p className='login-div' style={{color: '#EE4B2B', fontWeight: 'bold'}}>{attemptsLeft} attempts left before 30 minute login timeout</p> : null}
                {accountLocked ? <p className='login-div' style={{color: '#EE4B2B', fontWeight: 'bold'}}>Account Locked</p> : null}
                <div className="login-div">
                    <button className='login-button' type='submit'>Login</button>
                </div>
            </form></div>    
            <div className="login-div">
                <nav>
                    <p>Don't have an account? <Link to='/signUp'>Sign Up!</Link></p>
                </nav>
            </div>
            
        </div>
    )
}

export default Login;