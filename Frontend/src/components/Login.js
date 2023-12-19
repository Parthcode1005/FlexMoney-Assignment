// src/components/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserProvider, useUser } from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const history = useHistory();
    const { updateUser } = useUser(); // Use the useUser hook to access the user context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            // Check the login response from the server
            if (response.data.success) {
                updateUser(response.data.user);
                console.log(response.data)
                if (response.data.feesPaid) {
                    // User has paid the fee, redirect to confirmation page
                    history.push('/confirmation');
                } else {
                    // User has not paid the fee, redirect to payments page
                    history.push('/payment');
                }
            } else {
                // Display toast for invalid user and redirect to registration page
                toast.error('Invalid user credentials. Please sign up.');
                history.push('/registration');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleSignup = () => {
        // Redirect to the registration page
        history.push('/registration');
    };

    return (
        <div className='login-container'>
            <h2>Login Page</h2>
            <div className='login-box'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <div className='button-container'>
                        <button type="submit">Login</button>
                        <button onClick={handleSignup}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
